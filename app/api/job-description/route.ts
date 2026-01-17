import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import SubscriptionModel from '@/app/api/models/subscriptionModel'
import JobDescriptionModel from '@/app/api/models/jobDescriptionModel'
import { SUBSCRIPTION_TIERS } from '@/constants/limit'

// POST - Create new job description (paid users only)
export async function POST(request: Request) {
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

    // Check subscription - only paid users can upload job descriptions
    const subscription = await SubscriptionModel.findOne({ user_id: user._id })
    if (!subscription || subscription.tier === SUBSCRIPTION_TIERS.FREE) {
      return NextResponse.json(
        { error: 'Job description upload is a premium feature. Please upgrade to continue.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { description } = body

    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      )
    }

    // Create job description
    const jobDescription = await JobDescriptionModel.create({
      user_id: user._id,
      description: description.trim(),
      usage_count: 0
    })

    return NextResponse.json({
      success: true,
      message: 'Job description saved successfully',
      data: {
        _id: jobDescription._id,
        description: jobDescription.description,
        created_at: jobDescription.createdAt
      }
    })
  } catch (error) {
    console.error('Error creating job description:', error)
    return NextResponse.json(
      { error: 'Failed to save job description' },
      { status: 500 }
    )
  }
}

// GET - Fetch user's job descriptions
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

    // Fetch all job descriptions for this user, sorted by most recently created
    const jobDescriptions = await JobDescriptionModel.find({ user_id: user._id })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: jobDescriptions.map(jd => ({
        _id: jd._id.toString(),
        description: jd.description,
        usage_count: jd.usage_count,
        last_used_at: jd.last_used_at,
        created_at: jd.createdAt
      }))
    })
  } catch (error) {
    console.error('Error fetching job descriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job descriptions' },
      { status: 500 }
    )
  }
}