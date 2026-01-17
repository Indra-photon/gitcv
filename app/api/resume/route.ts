import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import ResumeModel from '@/app/api/models/resumeModel'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const user = await UserModel.findOne({ clerk_id: userId })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Fetch all resumes for this user, sorted by most recent
    const resumes = await ResumeModel.find({ user_id: user._id })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: resumes.map(resume => ({
        _id: resume._id.toString(),
        title: resume.title,
        role: resume.role,
        template: resume.template,
        status: resume.status,
        selected_repos: resume.selected_repos,
        job_description_id: resume.job_description_id?.toString() || null,
        pdf_url: resume.pdf_url,
        pdf_expires_at: resume.pdf_expires_at,
        created_at: resume.createdAt,
        updated_at: resume.updatedAt
      })),
      total_count: resumes.length
    })
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}