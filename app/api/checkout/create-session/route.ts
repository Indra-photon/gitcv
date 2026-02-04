import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import SubscriptionModel from '@/app/api/models/subscriptionModel'
import { DODO_CONFIG, DODO_PRODUCT_MAP } from '@/lib/dodoConfig'
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

    if (!tier || !DODO_PRODUCT_MAP[tier as keyof typeof DODO_PRODUCT_MAP]) {
      return NextResponse.json(
        { error: 'Invalid tier' },
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

    if (subscription.tier !== SUBSCRIPTION_TIERS.FREE) {
      return NextResponse.json(
        { error: 'Already subscribed. Please manage your subscription instead.' },
        { status: 400 }
      )
    }

    const client = new DodoPayments({
      bearerToken: DODO_CONFIG.apiKey,
      environment: DODO_CONFIG.environment as 'test_mode' | 'live_mode'
    })

    const productId = DODO_PRODUCT_MAP[tier as keyof typeof DODO_PRODUCT_MAP]

    const session = await client.checkoutSessions.create({
      product_cart: [{
        product_id: productId,
        quantity: 1
      }],
      customer: {
        email: user.github_username + '@github.user',
        name: user.full_name || user.github_username
      },
      return_url: `${DODO_CONFIG.baseUrl}/dashboard/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`
    })

    return NextResponse.json({
      success: true,
      checkout_url: session.checkout_url,
      session_id: session.session_id
    })

  } catch (error) {
    console.error('Checkout session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}