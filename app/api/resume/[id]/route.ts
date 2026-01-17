import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import ResumeModel from '@/app/api/models/resumeModel'

// GET - Fetch specific resume
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    const resume = await ResumeModel.findOne({
      _id: id,
      user_id: user._id
    }).lean()

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: resume._id.toString(),
        title: resume.title,
        role: resume.role,
        template: resume.template,
        selected_repos: resume.selected_repos,
        content: resume.content,
        status: resume.status,
        job_description_id: resume.job_description_id?.toString() || null,
        ai_metadata: resume.ai_metadata,
        pdf_url: resume.pdf_url,
        pdf_expires_at: resume.pdf_expires_at,
        created_at: resume.createdAt,
        updated_at: resume.updatedAt
      }
    })
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

// PATCH - Update resume content
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    const body = await request.json()

    // Allow updating: title, content, template
    const updateData: any = {}
    if (body.title) updateData.title = body.title
    if (body.content) updateData.content = body.content
    if (body.template) updateData.template = body.template

    const updatedResume = await ResumeModel.findOneAndUpdate(
      { _id: id, user_id: user._id },
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedResume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Resume updated successfully',
      data: {
        _id: updatedResume._id.toString(),
        title: updatedResume.title,
        content: updatedResume.content,
        template: updatedResume.template,
        updated_at: updatedResume.updatedAt
      }
    })
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

// DELETE - Delete resume
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    const resume = await ResumeModel.findOneAndDelete({
      _id: id,
      user_id: user._id
    })

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Resume deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}