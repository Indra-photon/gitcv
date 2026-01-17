import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import JobDescriptionModel from '@/app/api/models/jobDescriptionModel'

// GET - Fetch specific job description
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

    const jobDescription = await JobDescriptionModel.findOne({
      _id: id,
      user_id: user._id
    }).lean()

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: jobDescription._id.toString(),
        description: jobDescription.description,
        usage_count: jobDescription.usage_count,
        last_used_at: jobDescription.last_used_at,
        created_at: jobDescription.createdAt
      }
    })
  } catch (error) {
    console.error('Error fetching job description:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job description' },
      { status: 500 }
    )
  }
}

// DELETE - Delete job description
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

    const jobDescription = await JobDescriptionModel.findOneAndDelete({
      _id: id,
      user_id: user._id
    })

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Job description deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting job description:', error)
    return NextResponse.json(
      { error: 'Failed to delete job description' },
      { status: 500 }
    )
  }
}