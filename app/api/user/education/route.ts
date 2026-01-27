import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '../../models/UserModel'

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
    const { action, education } = body

    if (!action || !['add', 'update', 'delete', 'replace'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be: add, update, delete, or replace' },
        { status: 400 }
      )
    }

    const user = await UserModel.findOne({ clerk_id: userId })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    switch (action) {
      case 'add':
        if (!education?.degree || !education?.school || !education?.start_year) {
          return NextResponse.json(
            { error: 'degree, school, and start_year are required' },
            { status: 400 }
          )
        }
        user.education.push({
          degree: education.degree,
          school: education.school,
          start_year: education.start_year,
          end_year: education.end_year || null,
          gpa: education.gpa || null
        })
        break

      case 'update':
        if (education?.index === undefined) {
          return NextResponse.json(
            { error: 'index is required for update' },
            { status: 400 }
          )
        }
        if (education.index < 0 || education.index >= user.education.length) {
          return NextResponse.json(
            { error: 'Invalid index' },
            { status: 400 }
          )
        }
        if (education.degree) user.education[education.index].degree = education.degree
        if (education.school) user.education[education.index].school = education.school
        if (education.start_year) user.education[education.index].start_year = education.start_year
        if (education.end_year !== undefined) user.education[education.index].end_year = education.end_year
        if (education.gpa !== undefined) user.education[education.index].gpa = education.gpa
        break

      case 'delete':
        if (education?.index === undefined) {
          return NextResponse.json(
            { error: 'index is required for delete' },
            { status: 400 }
          )
        }
        if (education.index < 0 || education.index >= user.education.length) {
          return NextResponse.json(
            { error: 'Invalid index' },
            { status: 400 }
          )
        }
        user.education.splice(education.index, 1)
        break

      case 'replace':
        if (!Array.isArray(education)) {
          return NextResponse.json(
            { error: 'education must be an array for replace action' },
            { status: 400 }
          )
        }
        user.education = education
        break
    }

    await user.save()

    return NextResponse.json({
      success: true,
      message: 'Education updated successfully',
      data: user.education
    })
  } catch (error) {
    console.error('Error updating education:', error)
    return NextResponse.json(
      { error: 'Failed to update education' },
      { status: 500 }
    )
  }
}