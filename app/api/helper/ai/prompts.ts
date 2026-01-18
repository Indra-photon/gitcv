/**
 * AI Prompt Templates for Resume Generation
 * Different prompts for Free vs Paid tiers
 */

import { ResumeRole } from '@/constants/limit'
import { GitHubRepoWithReadme } from '@/app/api/helper/github'
import { IUser } from '@/app/api/models/UserModel'

type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'lead'

const ACTION_VERBS = {
  junior: ['Built', 'Developed', 'Implemented', 'Created', 'Learned', 'Worked on', 'Contributed to'],
  mid: ['Designed', 'Engineered', 'Integrated', 'Developed', 'Created', 'Implemented', 'Built'],
  senior: ['Architected', 'Led', 'Optimized', 'Scaled', 'Designed', 'Established', 'Spearheaded'],
  lead: ['Spearheaded', 'Directed', 'Established', 'Transformed', 'Led', 'Architected', 'Drove']
}

const ROLE_FOCUS = {
  frontend: 'UI/UX implementation, responsive design, state management, component architecture, user experience',
  backend: 'API design, database architecture, server optimization, scalability, security, data processing',
  fullstack: 'end-to-end application development, both frontend and backend technologies, full-stack architecture',
  mobile: 'mobile app development, native features, cross-platform solutions, mobile UI/UX, app performance',
  devops: 'CI/CD pipelines, infrastructure automation, deployment strategies, monitoring, cloud services'
}

/**
 * Build system prompt for AI
 */
function buildSystemPrompt(isPaid: boolean): string {
  const qualityLevel = isPaid ? 'exceptional, highly detailed' : 'professional, concise'
  
  return `You are an expert resume writer specializing in technical resumes for software developers.

Your task is to analyze GitHub repositories and generate ${qualityLevel} resume content.

**CRITICAL RULES:**
1. Generate ONLY valid JSON - no markdown, no explanations, no preamble
2. Follow the exact JSON structure provided
3. Use the XYZ bullet formula: "Accomplished [X] as measured by [Y], by doing [Z]"
4. Be specific about technologies and impact
5. Use appropriate action verbs based on experience level
6. Focus on problems solved and technical implementation
7. Extract skills accurately from repository context

**OUTPUT FORMAT:**
Return ONLY a JSON object with this exact structure:
{
  "projects": [
    {
      "repo_name": "string",
      "repo_url": "string",
      "description": "string (1-2 sentences)",
      "bullets": ["string", "string", "string"],
      "technologies": ["string", "string"]
    }
  ],
  "skills": {
    "frontend": ["string"],
    "backend": ["string"],
    "databases": ["string"],
    "tools": ["string"],
    "other": ["string"]
  },
  "problems_solved": ["string", "string", "string"]
}

Do not include any text outside the JSON object.`
}

/**
 * Build user prompt with all context
 */
function buildUserPrompt(
  user: IUser,
  repos: GitHubRepoWithReadme[],
  role: ResumeRole,
  experienceLevel: ExperienceLevel,
  jobDescription?: string
): string {
  const actionVerbs = ACTION_VERBS[experienceLevel].join(', ')
  const roleFocus = ROLE_FOCUS[role]

  let prompt = `Generate resume content for a ${experienceLevel} ${role} developer.

**EXPERIENCE LEVEL:** ${experienceLevel}
**TARGET ROLE:** ${role}
**ACTION VERBS TO USE:** ${actionVerbs}
**FOCUS AREAS:** ${roleFocus}

`

  // Add job description analysis if provided (paid feature)
  if (jobDescription) {
    prompt += `**JOB DESCRIPTION (PAID FEATURE - USE THIS FOR KEYWORD OPTIMIZATION):**
${jobDescription}

Extract key requirements from the job description and emphasize relevant skills in the resume content.

`
  }

  // Add user work experience context
  if (user.work_experience && user.work_experience.length > 0) {
    prompt += `**USER'S WORK EXPERIENCE (for context):**
`
    user.work_experience.forEach((exp) => {
      prompt += `- ${exp.job_title} at ${exp.company}: ${exp.description}\n`
    })
    prompt += `\n`
  }

  // Add repository information
  prompt += `**GITHUB REPOSITORIES TO ANALYZE:**

`

  repos.forEach((repo, index) => {
    prompt += `Repository ${index + 1}: ${repo.name}
URL: ${repo.html_url}
Description: ${repo.description}
Language: ${repo.language}
Topics: ${repo.topics.join(', ') || 'None'}
Stars: ${repo.stargazers_count}

README Content:
${repo.readme.slice(0, 3000)}${repo.readme.length > 3000 ? '... (truncated)' : ''}

---

`
  })

  prompt += `
**INSTRUCTIONS:**

1. **Projects Section:**
   - Generate 2-4 bullet points per project using the XYZ formula
   - Start bullets with action verbs appropriate for ${experienceLevel} level: ${actionVerbs}
   - Include specific technologies mentioned in README
   - Highlight ${roleFocus}
   - Focus on WHAT was built, WHY it matters, and HOW it was implemented

2. **Skills Section:**
   - Extract ALL technologies mentioned across repositories
   - Categorize into: frontend, backend, databases, tools, other
   - Only include skills that are actually present in the repositories
   - Be comprehensive but accurate

3. **Problems Solved Section:**
   - Create 3-5 high-impact achievement statements
   - Extract from repositories and work experience
   - Focus on scalability, performance, user impact, technical challenges overcome
   - Use metrics when possible (e.g., "Scaled to 10K users", "Reduced load time by 60%")
   - These should be impressive one-liners that showcase technical excellence

${jobDescription ? `4. **Job Description Alignment:**
   - Emphasize technologies and skills mentioned in the job description
   - Use similar terminology to the job posting
   - Highlight relevant experience that matches requirements
` : ''}

Generate the JSON now.`

  return prompt
}

/**
 * Generate AI prompts for resume generation
 */
export function generatePrompts(
  user: IUser,
  repos: GitHubRepoWithReadme[],
  role: ResumeRole,
  experienceLevel: ExperienceLevel,
  isPaid: boolean,
  jobDescription?: string
): { systemPrompt: string; userPrompt: string } {
  const systemPrompt = buildSystemPrompt(isPaid)
  const userPrompt = buildUserPrompt(user, repos, role, experienceLevel, jobDescription)

  return {
    systemPrompt,
    userPrompt
  }
}