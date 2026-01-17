import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function CompleteProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { sessionClaims } = await auth()

  if (sessionClaims?.metadata?.profileComplete === true) {
    redirect('/dashboard')
  }

  return <>{children}</>
}