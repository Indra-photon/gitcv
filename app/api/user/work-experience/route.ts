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
    const { action, work_experience } = body

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
        if (!work_experience?.job_title || !work_experience?.company || !work_experience?.start_date || !work_experience?.description) {
          return NextResponse.json(
            { error: 'job_title, company, start_date, and description are required' },
            { status: 400 }
          )
        }
        user.work_experience.push({
          job_title: work_experience.job_title,
          company: work_experience.company,
          start_date: new Date(work_experience.start_date),
          end_date: work_experience.end_date ? new Date(work_experience.end_date) : null,
          description: work_experience.description
        })
        break

      case 'update':
        if (work_experience?.index === undefined) {
          return NextResponse.json(
            { error: 'index is required for update' },
            { status: 400 }
          )
        }
        if (work_experience.index < 0 || work_experience.index >= user.work_experience.length) {
          return NextResponse.json(
            { error: 'Invalid index' },
            { status: 400 }
          )
        }
        if (work_experience.job_title) user.work_experience[work_experience.index].job_title = work_experience.job_title
        if (work_experience.company) user.work_experience[work_experience.index].company = work_experience.company
        if (work_experience.start_date) user.work_experience[work_experience.index].start_date = new Date(work_experience.start_date)
        if (work_experience.end_date !== undefined) user.work_experience[work_experience.index].end_date = work_experience.end_date ? new Date(work_experience.end_date) : null
        if (work_experience.description) user.work_experience[work_experience.index].description = work_experience.description
        break

      case 'delete':
        if (work_experience?.index === undefined) {
          return NextResponse.json(
            { error: 'index is required for delete' },
            { status: 400 }
          )
        }
        if (work_experience.index < 0 || work_experience.index >= user.work_experience.length) {
          return NextResponse.json(
            { error: 'Invalid index' },
            { status: 400 }
          )
        }
        user.work_experience.splice(work_experience.index, 1)
        break

      case 'replace':
        if (!Array.isArray(work_experience)) {
          return NextResponse.json(
            { error: 'work_experience must be an array for replace action' },
            { status: 400 }
          )
        }
        user.work_experience = work_experience.map((exp: any) => ({
          job_title: exp.job_title,
          company: exp.company,
          start_date: new Date(exp.start_date),
          end_date: exp.end_date ? new Date(exp.end_date) : null,
          description: exp.description
        }))
        break
    }

    await user.save()

    return NextResponse.json({
      success: true,
      message: 'Work experience updated successfully',
      data: user.work_experience
    })
  } catch (error) {
    console.error('Error updating work experience:', error)
    return NextResponse.json(
      { error: 'Failed to update work experience' },
      { status: 500 }
    )
  }
}