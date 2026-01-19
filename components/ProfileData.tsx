import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'
import ProfileDataClient from './Profiledataclient'

export default async function ProfileData() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  await dbConnect()

  const user = await UserModel.findOne({ clerk_id: userId }).lean()

  if (!user) {
    redirect('/complete-profile')
  }

  // Convert MongoDB ObjectId to string for client component
  const userData = {
    ...user,
    _id: user._id.toString(),
    education: user.education.map((edu: any) => ({
      ...edu,
      start_year: edu.start_year,
      end_year: edu.end_year,
      gpa: edu.gpa
    })),
    work_experience: user.work_experience.map((exp: any) => ({
      ...exp,
      start_date: exp.start_date.toISOString(),
      end_date: exp.end_date ? exp.end_date.toISOString() : null
    }))
  }

  return <ProfileDataClient user={userData} />
}