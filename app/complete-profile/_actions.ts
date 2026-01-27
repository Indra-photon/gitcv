'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import SubscriptionModel from '@/app/api/models/subscriptionModel'
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_STATUS } from '@/constants/limit'

export const completeProfile = async (formData: FormData) => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated || !userId) {
    return { error: 'Not authenticated' }
  }

  try {
    await dbConnect()

    // Extract form data
    const github_username = formData.get('github_username') as string
    const full_name = formData.get('full_name') as string | null
    const phone = formData.get('phone') as string | null
    const location = formData.get('location') as string | null
    const portfolio_url = formData.get('portfolio_url') as string | null
    const linkedin_url = formData.get('linkedin_url') as string | null
    const professional_headline = formData.get('professional_headline') as string | null

    // Education (optional)
    const degree = formData.get('degree') as string | null
    const school = formData.get('school') as string | null
    const start_year = formData.get('start_year') as string | null
    const end_year = formData.get('end_year') as string | null
    const gpa = formData.get('gpa') as string | null

    // Work Experience (optional)
    const job_title = formData.get('job_title') as string | null
    const company = formData.get('company') as string | null
    const start_date = formData.get('start_date') as string | null
    const end_date = formData.get('end_date') as string | null
    const job_description = formData.get('job_description') as string | null

    // Additional Info (optional)
    const certifications = formData.get('certifications') as string | null
    const languages = formData.get('languages') as string | null
    const custom_skills = formData.get('custom_skills') as string | null

    // Check if user already exists
    const existingUser = await UserModel.findOne({ clerk_id: userId })
    console.log('existingUser:', existingUser);
    
    if (existingUser) {
      return { error: 'Profile already completed' }
    }

    // Validate required field
    if (!github_username) {
      return { error: 'GitHub username is required' }
    }

    if (!full_name || !full_name.trim()) {
      return { error: 'Full name is required' }
    }

    // check if github_username is valid (alphanumeric and hyphens only) and unique so that same user cannot register again with same github username
    const githubUsernameRegex = /^[a-zA-Z0-9-]+$/
    if (!githubUsernameRegex.test(github_username)) {
      return { error: 'Invalid GitHub username format' }
    }
    const githubUserExists = await UserModel.findOne({ github_username: github_username.trim() })
    if (githubUserExists) {
      return { error: 'GitHub username already taken' }
    }

    // Prepare education array
    const education = []
    if (degree && school && start_year) {
      education.push({
        degree,
        school,
        start_year: parseInt(start_year),
        end_year: end_year ? parseInt(end_year) : null,
        gpa: gpa ? parseFloat(gpa) : null
      })
    }

    // Prepare work experience array
    const work_experience = []
    if (job_title && company && start_date && job_description) {
      work_experience.push({
        job_title,
        company,
        start_date: new Date(start_date),
        end_date: end_date ? new Date(end_date) : null,
        description: job_description
      })
    }

    // Parse comma-separated values
    const parseCsv = (value: string | null) => {
      if (!value) return []
      return value.split(',').map(item => item.trim()).filter(item => item.length > 0)
    }

    // Create user in MongoDB
    const newUser = await UserModel.create({
      clerk_id: userId,
      github_username: github_username.trim(),
      full_name: full_name.trim(),
      phone: phone?.trim() || null,
      location: location?.trim() || null,
      portfolio_url: portfolio_url?.trim() || null,
      linkedin_url: linkedin_url?.trim() || null,
      professional_headline: professional_headline?.trim() || null,
      education,
      work_experience,
      certifications: parseCsv(certifications),
      languages: parseCsv(languages),
      custom_skills: parseCsv(custom_skills)
    })

    // Create default free subscription for user
    await SubscriptionModel.create({
      user_id: newUser._id,
      tier: SUBSCRIPTION_TIERS.FREE,
      status: SUBSCRIPTION_STATUS.ACTIVE
    })

    // Update Clerk publicMetadata to mark profile as complete
    const client = await clerkClient()
    await client.users.updateUser(userId, {
      publicMetadata: {
        profileComplete: true
      }
    })

    return { message: 'Profile completed successfully' }
  } catch (err) {
    console.error('Error completing profile:', err)
    return { error: 'Failed to save profile. Please try again.' }
  }
}