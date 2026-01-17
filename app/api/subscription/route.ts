import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import SubscriptionModel from '@/app/api/models/subscriptionModel'
import ResumeModel from '@/app/api/models/resumeModel'
import { SUBSCRIPTION_TIERS } from '@/constants/limit'

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

    const subscription = await SubscriptionModel.findOne({ user_id: user._id })
    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Count saved resumes
    const savedResumesCount = await ResumeModel.countDocuments({
      user_id: user._id
    })

    // Prepare response based on tier
    const isFree = subscription.tier === SUBSCRIPTION_TIERS.FREE

    const response: any = {
      success: true,
      data: {
        tier: subscription.tier,
        status: subscription.status,
        is_premium: !isFree,
        features: {
          job_description_upload: !isFree,
          pdf_expiration: isFree ? '15 days' : 'never',
        }
      }
    }

    if (isFree) {
      // Free tier limits
      response.data.limits = {
        generation_attempts: {
          used: subscription.generation_attempts_used,
          limit: subscription.generation_attempts_limit,
          remaining: subscription.generation_attempts_limit - subscription.generation_attempts_used
        },
        saved_resumes: {
          current: savedResumesCount,
          limit: subscription.saved_resumes_limit,
          remaining: subscription.saved_resumes_limit - savedResumesCount
        }
      }
    } else {
      // Paid tier limits
      response.data.limits = {
        monthly_resumes: {
          created: subscription.monthly_resumes_created,
          limit: subscription.monthly_resumes_limit,
          remaining: subscription.monthly_resumes_limit - subscription.monthly_resumes_created
        },
        billing_period: {
          start: subscription.current_period_start,
          end: subscription.current_period_end
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching subscription status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription status' },
      { status: 500 }
    )
  }
}