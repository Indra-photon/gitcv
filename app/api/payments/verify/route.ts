import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import SubscriptionModel from '@/app/api/models/subscriptionModel'
import { getTierFromProductId } from '@/lib/dodoConfig'
import { SUBSCRIPTION_TIERS } from '@/constants/limit'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { tier } = await request.json()

    if (!tier) {
      return NextResponse.json(
        { error: 'Tier required' },
        { status: 400 }
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

    const updateData: any = {
      tier: tier,
      status: 'active'
    }

    if (tier !== SUBSCRIPTION_TIERS.LIFETIME) {
      const now = new Date()
      const periodEnd = new Date(now)
      
      if (tier === SUBSCRIPTION_TIERS.PREMIUM_MONTHLY) {
        periodEnd.setMonth(periodEnd.getMonth() + 1)
      } else if (tier === SUBSCRIPTION_TIERS.PREMIUM_ANNUAL) {
        periodEnd.setFullYear(periodEnd.getFullYear() + 1)
      }
      
      updateData.current_period_start = now
      updateData.current_period_end = periodEnd
    }

    await SubscriptionModel.updateOne(
      { _id: subscription._id },
      { $set: updateData }
    )

    return NextResponse.json({
      success: true,
      verified: true,
      tier: tier,
      status: 'active'
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}