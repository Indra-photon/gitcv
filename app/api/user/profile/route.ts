import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'

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

    const user = await UserModel.findOne({ clerk_id: userId }).lean()

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const body = await request.json()

    // Extract only allowed fields
    const {
      phone,
      location,
      portfolio_url,
      linkedin_url,
      professional_headline,
      github_username
    } = body

    // Build update object with only provided fields
    const updateData: Record<string, any> = {}
    
    if (phone !== undefined) updateData.phone = phone?.trim() || null
    if (location !== undefined) updateData.location = location?.trim() || null
    if (portfolio_url !== undefined) updateData.portfolio_url = portfolio_url?.trim() || null
    if (linkedin_url !== undefined) updateData.linkedin_url = linkedin_url?.trim() || null
    if (professional_headline !== undefined) updateData.professional_headline = professional_headline?.trim() || null
    if (github_username !== undefined) updateData.github_username = github_username?.trim()

    // Update user
    const updatedUser = await UserModel.findOneAndUpdate(
      { clerk_id: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}










