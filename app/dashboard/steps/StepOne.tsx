'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lock, Edit, Briefcase, GraduationCap, Award, Languages, MapPin, Globe, Linkedin, Phone, Mail, Github, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResumeRole, RESUME_ROLES } from '@/constants/limit'
import { SubHeading } from '@/components/SubHeading'
import { cn } from '@/lib/utils'
import { CalSans } from '@/lib/fonts'

interface StepOneProps {
  userProfile: any
  subscription: any
  selectedRole: ResumeRole | null
  setSelectedRole: (role: ResumeRole) => void
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead' | null
  setExperienceLevel: (level: 'junior' | 'mid' | 'senior' | 'lead') => void
  jobDescription: string
  setJobDescription: (desc: string) => void
  onNext: () => void
}

const ROLE_OPTIONS = [
  { value: RESUME_ROLES.FRONTEND, label: 'Frontend Developer', icon: '🎨' },
  { value: RESUME_ROLES.BACKEND, label: 'Backend Developer', icon: '⚙️' },
  { value: RESUME_ROLES.FULLSTACK, label: 'Fullstack Developer', icon: '🚀' },
  { value: RESUME_ROLES.MOBILE, label: 'Mobile Developer', icon: '📱' },
  { value: RESUME_ROLES.DEVOPS, label: 'DevOps Engineer', icon: '🔧' }
]

const EXPERIENCE_OPTIONS = [
  { value: 'junior', label: 'Junior', description: '0-2 years' },
  { value: 'mid', label: 'Mid-Level', description: '2-5 years' },
  { value: 'senior', label: 'Senior', description: '5-10 years' },
  { value: 'lead', label: 'Lead/Staff', description: '10+ years' }
]

export default function StepOne({
  userProfile,
  subscription,
  selectedRole,
  setSelectedRole,
  experienceLevel,
  setExperienceLevel,
  jobDescription,
  setJobDescription,
  onNext
}: StepOneProps) {
  const [showPaywall, setShowPaywall] = useState(false)
  const isPaid = subscription.tier !== 'free'

  const canContinue = selectedRole && experienceLevel

  return (
    <div className="p-6 space-y-8">
      {/* Profile Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <SubHeading className='text-neutral-600'>Your Profile Details</SubHeading>
          <Link href="/profile">
            <Button variant="outline" size="sm">
              <Edit className="size-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.full_name && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50">
              <User className="size-4 text-neutral-600 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>Full Name</p>
                <p className={cn("text-sm text-neutral-900 truncate", CalSans.className)}>{userProfile.full_name}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50">
            <Github className="size-4 text-neutral-600 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm text-neutral-500", CalSans.className)}>GitHub</p>
              <a
                href={`https://github.com/${userProfile.github_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("text-sm text-blue-600 hover:text-blue-700 truncate block", CalSans.className)}
              >
                {userProfile.github_username}
              </a>
            </div>
          </div>

          {/* Personal Info */}
          {userProfile.phone && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50">
              <Phone className="size-4 text-neutral-600 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>Phone</p>
                <p className={cn("text-sm text-neutral-900 truncate", CalSans.className)}>{userProfile.phone}</p>
              </div>
            </div>
          )}

          {userProfile.location && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50">
              <MapPin className="size-4 text-neutral-600 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>Location</p>
                <p className={cn("text-sm text-neutral-900 truncate", CalSans.className)}>{userProfile.location}</p>
              </div>
            </div>
          )}

          {userProfile.portfolio_url && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50">
              <Globe className="size-4 text-neutral-600 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>Portfolio</p>
                <a
                  href={userProfile.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("text-sm text-blue-600 hover:text-blue-700 truncate block", CalSans.className)}
                >
                  {userProfile.portfolio_url}
                </a>
              </div>
            </div>
          )}

          {userProfile.linkedin_url && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50">
              <Linkedin className="size-4 text-neutral-600 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>LinkedIn</p>
                <a
                  href={userProfile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("text-sm text-blue-600 hover:text-blue-700 truncate block", CalSans.className)}
                >
                  {userProfile.linkedin_url}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Education */}
        {userProfile.education?.length > 0 && (
          <div className="space-y-2">
            <div className={cn("flex items-center gap-2 text-sm font-medium text-neutral-700", CalSans.className)}>
              <GraduationCap className="size-4" />
              Education
            </div>
            <div className="space-y-2">
              {userProfile.education.map((edu: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-50">
                  <p className={cn("text-sm font-medium text-neutral-900", CalSans.className)}>
                    {edu.degree} - {edu.school}
                  </p>
                  <p className={cn("text-sm text-neutral-600", CalSans.className)}>
                    {edu.start_year} - {edu.end_year || 'Present'}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {userProfile.work_experience?.length > 0 && (
          <div className="space-y-2">
            <div className={cn("flex items-center gap-2 text-sm font-medium text-neutral-700", CalSans.className)}>
              <Briefcase className="size-4" />
              Work Experience
            </div>
            <div className="space-y-2">
              {userProfile.work_experience.map((exp: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-50">
                  <p className={cn("text-sm font-medium text-neutral-900", CalSans.className)}>
                    {exp.job_title} at {exp.company}
                  </p>
                  <p className={cn("text-sm text-neutral-600", CalSans.className)}>
                    {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills, Certifications, Languages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userProfile.custom_skills?.length > 0 && (
            <div className="space-y-2">
              <div className={cn("flex items-center gap-2 text-sm font-medium text-neutral-700", CalSans.className)}>
                <Award className="size-4" />
                Skills
              </div>
              <div className="flex flex-wrap gap-1">
                {userProfile.custom_skills.slice(0, 5).map((skill: string, idx: number) => (
                  <span key={idx} className={cn("px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded", CalSans.className)}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {userProfile.certifications?.length > 0 && (
            <div className="space-y-2">
              <div className={cn("flex items-center gap-2 text-sm font-medium text-neutral-700", CalSans.className)}>
                <Award className="size-4" />
                Certifications
              </div>
              <div className="flex flex-wrap gap-1">
                {userProfile.certifications.slice(0, 3).map((cert: string, idx: number) => (
                  <span key={idx} className={cn("px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded", CalSans.className)}>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {userProfile.languages?.length > 0 && (
            <div className="space-y-2">
              <div className={cn("flex items-center gap-2 text-sm font-medium text-neutral-700", CalSans.className)}>
                <Languages className="size-4" />
                Languages
              </div>
              <div className="flex flex-wrap gap-1">
                {userProfile.languages.map((lang: string, idx: number) => (
                  <span key={idx} className={cn("px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded", CalSans.className)}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-4">
        <div>
          <SubHeading className='text-neutral-600'>Job Description (Optional)</SubHeading>
          <p className={cn("text-sm text-neutral-600 mt-1", CalSans.className)}>
            {isPaid
              ? 'Paste the job description to tailor your resume with AI matching'
              : 'Upgrade to Premium to unlock AI-powered job description matching'
            }
          </p>
        </div>

        <div className="relative">
          <Textarea
            value={jobDescription}
            onChange={(e) => isPaid && setJobDescription(e.target.value)}
            placeholder={isPaid ? "Paste job description here..." : "Premium feature - upgrade to unlock"}
            disabled={!isPaid}
            className={`min-h-[120px] resize-none ${!isPaid ? 'blur-sm cursor-not-allowed' : ''}`}
          />

          {!isPaid && (
            <div className={cn("absolute inset-0 flex items-center justify-center bg-white/70", CalSans.className)}>
              <Button
                onClick={() => setShowPaywall(true)}
                variant="default"
                size="sm"
              >
                <Lock className="size-4 mr-2" />
                Unlock Premium Feature
              </Button>
            </div>
          )}
        </div>

        {isPaid && jobDescription && (
          <p className="text-xs text-neutral-500">
            {jobDescription.length} characters
          </p>
        )}
      </div>

      {/* Role Selection */}
      <div className="space-y-4">
        <div>
          <SubHeading className='text-neutral-600'>Select Your Role</SubHeading>
          <p className={cn("text-sm text-neutral-600 mt-1", CalSans.className)}>
            Choose the developer role that best matches your target position
          </p>
        </div>

        <RadioGroup value={selectedRole || ''} onValueChange={(value) => setSelectedRole(value as ResumeRole)}>
          <div className="flex flex-wrap gap-4">
            {ROLE_OPTIONS.map((option) => (
              <Label
                key={option.value}
                htmlFor={option.value}
                className="cursor-pointer"
              >
                <div className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${selectedRole === option.value
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 hover:border-neutral-300'
                  }`}>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <span className="text-sm font-medium text-neutral-900">{option.label}</span>
                </div>
              </Label>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Experience Level */}
      <div className="space-y-4">
        <div>
          <SubHeading className='text-neutral-600'>Experience Level</SubHeading>
          <p className={cn("text-sm text-neutral-600 mt-1", CalSans.className)}>
            Select your years of professional experience
          </p>
        </div>

        <RadioGroup value={experienceLevel || ''} onValueChange={(value) => setExperienceLevel(value as any)}>
          <div className="flex flex-wrap gap-4">
            {EXPERIENCE_OPTIONS.map((option) => (
              <Label
                key={option.value}
                htmlFor={option.value}
                className="cursor-pointer"
              >
                <div className={`flex flex-col gap-1 p-4 rounded-lg border-2 transition-colors ${experienceLevel === option.value
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 hover:border-neutral-300'
                  }`}>
                  <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                  <span className="text-sm font-medium text-neutral-900">{option.label}</span>
                  <span className="text-xs text-neutral-600">{option.description}</span>
                </div>
              </Label>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-4 border-t border-neutral-200">
        <Button
          onClick={onNext}
          disabled={!canContinue}
          size="lg"
        >
          Continue to Repository Selection
        </Button>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Upgrade to Premium</CardTitle>
              <CardDescription>
                Unlock AI-powered job description matching and get 30% better resume quality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-sm">AI analyzes job requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-sm">Keyword gap analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-sm">Tailored bullet points</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowPaywall(false)} className="flex-1">
                  Maybe Later
                </Button>
                <Button onClick={() => window.location.href = '/pricing'} className="flex-1">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}