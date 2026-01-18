/**
 * POST /api/resume/generate
 * Main route for AI-powered resume generation
 */

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import SubscriptionModel from '@/app/api/models/subscriptionModel'
import ResumeModel from '@/app/api/models/resumeModel'
import JobDescriptionModel from '@/app/api/models/jobDescriptionModel'
import { SUBSCRIPTION_TIERS, RESUME_ROLES, TEMPLATE_TYPES, ResumeRole, TemplateType } from '@/constants/limit'
import { fetchRepositoriesWithReadme } from '@/app/api/helper/github'
import { callNebiusAI, parseAIResponse } from '@/app/api/helper/ai/nebius'
import { generatePrompts } from '@/app/api/helper/ai/prompts'
import {
  canGenerateResume,
  canUseJobDescription,
  getPdfExpiryDate,
  isPaidTier,
  estimateAICost
} from '@/app/api/helper/subscriptionLimits'

// Request body interface
interface GenerateResumeRequest {
  selected_repos: string[] // Array of GitHub URLs (3-5 repos)
  role: ResumeRole
  experience_level: 'junior' | 'mid' | 'senior' | 'lead'
  template?: TemplateType
  job_description?: string // Optional, paid only
  title?: string // Optional resume title
}

export async function POST(request: Request) {
  const overallStartTime = Date.now()

  try {
    // ========================================
    // 1. AUTHENTICATION
    // ========================================
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ========================================
    // 2. DATABASE CONNECTION
    // ========================================
    await dbConnect()

    // ========================================
    // 3. FIND USER
    // ========================================
    const user = await UserModel.findOne({ clerk_id: userId })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // ========================================
    // 4. VALIDATE REQUEST BODY
    // ========================================
    const body: GenerateResumeRequest = await request.json()

    const {
      selected_repos,
      role,
      experience_level,
      template = TEMPLATE_TYPES.DEFAULT,
      job_description,
      title
    } = body

    // Validate required fields
    if (!selected_repos || !Array.isArray(selected_repos)) {
      return NextResponse.json(
        { error: 'selected_repos is required and must be an array' },
        { status: 400 }
      )
    }

    if (selected_repos.length < 3 || selected_repos.length > 5) {
      return NextResponse.json(
        { error: 'You must select between 3 and 5 repositories' },
        { status: 400 }
      )
    }

    if (!role || !Object.values(RESUME_ROLES).includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be one of: frontend, backend, fullstack, mobile, devops' },
        { status: 400 }
      )
    }

    if (!experience_level || !['junior', 'mid', 'senior', 'lead'].includes(experience_level)) {
      return NextResponse.json(
        { error: 'Invalid experience_level. Must be one of: junior, mid, senior, lead' },
        { status: 400 }
      )
    }

    // ========================================
    // 5. CHECK SUBSCRIPTION & LIMITS
    // ========================================
    const subscription = await SubscriptionModel.findOne({ user_id: user._id })
    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found. Please contact support.' },
        { status: 404 }
      )
    }

    // Count saved resumes
    const savedResumesCount = await ResumeModel.countDocuments({ user_id: user._id })

    // Check if user can generate resume
    const limitCheck = canGenerateResume(subscription, savedResumesCount)
    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          error: limitCheck.reason,
          limits: limitCheck.limits,
          upgrade_required: true
        },
        { status: 403 }
      )
    }

    // Check job description feature (paid only)
    if (job_description && !canUseJobDescription(subscription)) {
      return NextResponse.json(
        {
          error: 'Job description upload is a premium feature. Please upgrade to continue.',
          upgrade_required: true
        },
        { status: 403 }
      )
    }

    // ========================================
    // 6. FETCH GITHUB REPOS WITH README
    // ========================================
    console.log('Fetching GitHub repositories with README...')
    const repos = await fetchRepositoriesWithReadme(selected_repos)

    if (repos.length === 0) {
      return NextResponse.json(
        { error: 'Failed to fetch repository data. Please check the repository URLs.' },
        { status: 400 }
      )
    }

    if (repos.length < selected_repos.length) {
      console.warn(
        `Warning: Only fetched ${repos.length} out of ${selected_repos.length} repositories`
      )
    }

    // ========================================
    // 7. PREPARE AI PROMPT
    // ========================================
    console.log('Preparing AI prompts...')
    const paid = isPaidTier(subscription)
    const { systemPrompt, userPrompt } = generatePrompts(
      user,
      repos,
      role,
      experience_level,
      paid,
      job_description
    )

    // ========================================
    // 8. CALL NEBIUS AI
    // ========================================
    console.log('Calling Nebius AI...')
    const aiStartTime = Date.now()

    const aiResponse = await callNebiusAI(systemPrompt, userPrompt)

    const aiEndTime = Date.now()
    const aiGenerationTime = (aiEndTime - aiStartTime) / 1000

    console.log(`AI generation completed in ${aiGenerationTime}s`)
    console.log(`Tokens used: ${aiResponse.tokens_used}`)

    // ========================================
    // 9. PARSE AI RESPONSE
    // ========================================
    console.log('Parsing AI response...')
    let parsedContent
    try {
      parsedContent = parseAIResponse(aiResponse.content)
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      return NextResponse.json(
        {
          error: 'AI generated invalid response. Please try again.',
          debug: process.env.NODE_ENV === 'development' ? aiResponse.content : undefined
        },
        { status: 500 }
      )
    }

    // Validate parsed content structure
    if (!parsedContent.projects || !parsedContent.skills || !parsedContent.problems_solved) {
      return NextResponse.json(
        {
          error: 'AI response is missing required fields',
          debug: process.env.NODE_ENV === 'development' ? parsedContent : undefined
        },
        { status: 500 }
      )
    }

    // ========================================
    // 10. CALCULATE AI COST
    // ========================================
    const estimatedCost = estimateAICost(aiResponse.tokens_used)
    console.log(`Estimated AI cost: $${estimatedCost.toFixed(4)}`)

    // ========================================
    // 11. SAVE JOB DESCRIPTION (IF PROVIDED)
    // ========================================
    let jobDescriptionId: any = undefined
    if (job_description && paid) {
      console.log('Saving job description...')
      const jd = await JobDescriptionModel.create({
        user_id: user._id,
        description: job_description,
        last_used_at: new Date(),
        usage_count: 1
      })
      jobDescriptionId = jd._id
    }

    // ========================================
    // 12. SAVE RESUME TO DATABASE
    // ========================================
    console.log('Saving resume to database...')
    
    // Generate resume title
    const resumeTitle = title || `${role.charAt(0).toUpperCase() + role.slice(1)} Developer Resume`

    // Determine PDF expiry
    const pdfExpiryDate = getPdfExpiryDate(subscription)

    const newResume = await ResumeModel.create({
      user_id: user._id,
      job_description_id: jobDescriptionId,
      title: resumeTitle,
      role,
      template,
      selected_repos,
      content: {
        projects: parsedContent.projects,
        skills: parsedContent.skills,
        problems_solved: parsedContent.problems_solved
      },
      status: 'saved',
      ai_metadata: {
        model: 'Qwen/Qwen3-Coder-480B-A35B-Instruct',
        tokens_used: aiResponse.tokens_used,
        generation_time_seconds: aiGenerationTime,
        cost: estimatedCost,
        generated_at: new Date()
      },
      pdf_url: null, // PDF will be generated separately
      pdf_expires_at: pdfExpiryDate
    })

    // ========================================
    // 13. INCREMENT USAGE COUNTERS
    // ========================================
    console.log('Updating subscription counters...')
    
    if (subscription.tier === SUBSCRIPTION_TIERS.FREE) {
      // Increment generation attempts for free tier
      await SubscriptionModel.updateOne(
        { _id: subscription._id },
        {
          $inc: {
            generation_attempts_used: 1,
            saved_resumes_count: 1
          }
        }
      )
    } else {
      // Increment monthly resumes for paid tier
      await SubscriptionModel.updateOne(
        { _id: subscription._id },
        {
          $inc: { monthly_resumes_created: 1 }
        }
      )
    }

    // ========================================
    // 14. RETURN RESPONSE
    // ========================================
    const overallEndTime = Date.now()
    const totalTime = (overallEndTime - overallStartTime) / 1000

    console.log(`Resume generation completed in ${totalTime}s`)

    return NextResponse.json({
      success: true,
      message: 'Resume generated successfully',
      data: {
        resume_id: newResume._id.toString(),
        title: newResume.title,
        role: newResume.role,
        template: newResume.template,
        content: {
          projects: newResume.content.projects,
          skills: newResume.content.skills,
          problems_solved: newResume.content.problems_solved
        },
        status: newResume.status,
        pdf_expires_at: newResume.pdf_expires_at,
        created_at: newResume.createdAt,
        generation_stats: {
          total_time_seconds: totalTime,
          ai_generation_time_seconds: aiGenerationTime,
          tokens_used: aiResponse.tokens_used,
          estimated_cost: estimatedCost,
          repos_analyzed: repos.length
        }
      },
      limits: limitCheck.limits
    })
  } catch (error: any) {
    console.error('Error generating resume:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate resume',
        message: error.message || 'An unexpected error occurred',
        debug: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}