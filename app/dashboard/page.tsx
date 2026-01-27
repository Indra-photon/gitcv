import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ResumeGeneratorWizard from '@/components/ResumeGeneratorWizard'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-dvh bg-neutral-50">
      <Container className="py-8">
        <ResumeGeneratorWizard />
      </Container>
    </div>
  )
}