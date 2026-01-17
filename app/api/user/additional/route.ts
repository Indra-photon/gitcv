import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/userModel'

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
    const { certifications, languages, custom_skills } = body

    const updateData: Record<string, any> = {}

    if (certifications !== undefined) {
      updateData.certifications = Array.isArray(certifications) 
        ? certifications.filter((item: string) => item.trim().length > 0)
        : []
    }

    if (languages !== undefined) {
      updateData.languages = Array.isArray(languages)
        ? languages.filter((item: string) => item.trim().length > 0)
        : []
    }

    if (custom_skills !== undefined) {
      updateData.custom_skills = Array.isArray(custom_skills)
        ? custom_skills.filter((item: string) => item.trim().length > 0)
        : []
    }

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
      message: 'Additional information updated successfully',
      data: {
        certifications: updatedUser.certifications,
        languages: updatedUser.languages,
        custom_skills: updatedUser.custom_skills
      }
    })
  } catch (error) {
    console.error('Error updating additional information:', error)
    return NextResponse.json(
      { error: 'Failed to update additional information' },
      { status: 500 }
    )
  }
}