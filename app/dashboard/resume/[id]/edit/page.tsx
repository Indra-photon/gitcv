import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import ResumeModel from '@/app/api/models/resumeModel'
import ResumeEditor from '@/components/ResumeEditor'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ResumeEditPage({ params }: PageProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  await dbConnect()

  // Fetch user (only for validation)
  const user = await UserModel.findOne({ clerk_id: userId }).lean()
  
  if (!user) {
    redirect('/complete-profile')
  }

  // Get resume ID
  const { id } = await params

  // Fetch resume
  const resume = await ResumeModel.findOne({
    _id: id,
    user_id: user._id
  }).lean()

  if (!resume) {
    notFound()
  }

  // Serialize resume data with proper defaults
  const resumeData = {
    _id: resume._id.toString(),
    title: resume.title,
    role: resume.role,
    template: resume.template,
    selected_repos: resume.selected_repos,
    content: {
      projects: resume.content.projects || [],
      skills: {
        frontend: resume.content.skills?.frontend || [],
        backend: resume.content.skills?.backend || [],
        databases: resume.content.skills?.databases || [],
        tools: resume.content.skills?.tools || [],
        other: resume.content.skills?.other || []
      },
      problems_solved: resume.content.problems_solved || []
    },
    status: resume.status,
    pdf_url: resume.pdf_url,
    pdf_expires_at: resume.pdf_expires_at?.toISOString() || null,
    created_at: resume.createdAt.toISOString(),
    updated_at: resume.updatedAt.toISOString()
  }

  return (
    <div className="min-h-dvh bg-neutral-50">
      <ResumeEditor initialResume={resumeData} />
    </div>
  )
}