'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeProfile } from './_actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'

export default function CompleteProfilePage() {
  const [error, setError] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await completeProfile(formData)

      if (res?.message) {
        // Reload user to get updated metadata
        try {
          await user?.reload()
        } catch (reloadError) {
          console.warn('User reload failed, continuing with redirect:', reloadError)
        }

        // Use replace to prevent back navigation to this page
        // Add a small delay to ensure state is updated
        router.replace('/dashboard')

        // Fallback: if router.replace doesn't work, force redirect after a delay
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)

        return // Exit early on success
      }

      if (res?.error) {
        setError(res.error)
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-dvh bg-neutral-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-white border-neutral-200 shadow-sm">
        <CardHeader className="space-y-2 pb-6">
          <Heading as="h1" className="text-3xl text-neutral-900 text-balance">
            Complete Your Profile
          </Heading>
          <CardDescription className="text-neutral-600 text-pretty">
            Tell us about yourself to get started building your resume.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={handleSubmit} className="space-y-8">

            {/* Personal Information */}
            <div className="space-y-4">
              <Paragraph className="text-lg font-medium text-neutral-900">
                Personal Information
              </Paragraph>

              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-neutral-700">
                  Full Name *
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-neutral-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-neutral-700">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="San Francisco, CA"
                    className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolio_url" className="text-neutral-700">
                    Portfolio URL
                  </Label>
                  <Input
                    id="portfolio_url"
                    name="portfolio_url"
                    type="url"
                    placeholder="https://yourportfolio.com"
                    className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url" className="text-neutral-700">
                    LinkedIn URL
                  </Label>
                  <Input
                    id="linkedin_url"
                    name="linkedin_url"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="professional_headline" className="text-neutral-700">
                  Professional Headline
                </Label>
                <Input
                  id="professional_headline"
                  name="professional_headline"
                  type="text"
                  placeholder="Full-Stack Developer | React & Node.js"
                  className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github_username" className="text-neutral-700">
                  GitHub Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="github_username"
                  name="github_username"
                  type="text"
                  placeholder="yourusername"
                  required
                  className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                />
                <Paragraph variant="small" className="text-neutral-500">
                  Required to fetch your repositories and generate resumes.
                </Paragraph>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <Paragraph className="text-lg font-medium text-neutral-900">
                Education (Optional)
              </Paragraph>

              <div className="space-y-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree" className="text-neutral-700">
                      Degree
                    </Label>
                    <Input
                      id="degree"
                      name="degree"
                      type="text"
                      placeholder="B.S. Computer Science"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-neutral-700">
                      School/University
                    </Label>
                    <Input
                      id="school"
                      name="school"
                      type="text"
                      placeholder="University of California"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_year" className="text-neutral-700">
                      Start Year
                    </Label>
                    <Input
                      id="start_year"
                      name="start_year"
                      type="number"
                      placeholder="2020"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end_year" className="text-neutral-700">
                      End Year
                    </Label>
                    <Input
                      id="end_year"
                      name="end_year"
                      type="number"
                      placeholder="2024"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpa" className="text-neutral-700">
                      GPA (Optional)
                    </Label>
                    <Input
                      id="gpa"
                      name="gpa"
                      type="number"
                      step="0.01"
                      placeholder="3.8"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <Paragraph className="text-lg font-medium text-neutral-900">
                Work Experience (Optional)
              </Paragraph>

              <div className="space-y-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job_title" className="text-neutral-700">
                      Job Title
                    </Label>
                    <Input
                      id="job_title"
                      name="job_title"
                      type="text"
                      placeholder="Software Engineer"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-neutral-700">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Tech Corp"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date" className="text-neutral-700">
                      Start Date
                    </Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      type="date"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end_date" className="text-neutral-700">
                      End Date
                    </Label>
                    <Input
                      id="end_date"
                      name="end_date"
                      type="date"
                      className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                    />
                    <Paragraph variant="small" className="text-neutral-500">
                      Leave blank if current position
                    </Paragraph>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_description" className="text-neutral-700">
                    Description
                  </Label>
                  <Textarea
                    id="job_description"
                    name="job_description"
                    rows={3}
                    placeholder="Describe your responsibilities and achievements..."
                    className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500 text-pretty"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <Paragraph className="text-lg font-medium text-neutral-900">
                Additional Information (Optional)
              </Paragraph>

              <div className="space-y-2">
                <Label htmlFor="certifications" className="text-neutral-700">
                  Certifications
                </Label>
                <Input
                  id="certifications"
                  name="certifications"
                  type="text"
                  placeholder="AWS Certified, Google Cloud Professional (comma-separated)"
                  className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages" className="text-neutral-700">
                  Languages
                </Label>
                <Input
                  id="languages"
                  name="languages"
                  type="text"
                  placeholder="English, Spanish, French (comma-separated)"
                  className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom_skills" className="text-neutral-700">
                  Additional Skills
                </Label>
                <Input
                  id="custom_skills"
                  name="custom_skills"
                  type="text"
                  placeholder="Public Speaking, Team Leadership (comma-separated)"
                  className="bg-white border-neutral-300 text-neutral-900 focus:border-neutral-500"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <Paragraph className="text-red-600 text-pretty">
                  {error}
                </Paragraph>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8"
              >
                {isSubmitting ? 'Saving...' : 'Complete Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}