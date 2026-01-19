'use client'

import { useState } from 'react'
import { useUserStore } from '@/lib/store'
import { ResumeRole } from '@/constants/limit'
import StepOne from '@/app/dashboard/steps/StepOne'
import StepTwo from '@/app/dashboard/steps/StepTwo'
import StepThree from '@/app/dashboard/steps/StepThree'
import StepFour from '@/app/dashboard/steps/StepFour'

type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'lead'

export default function ResumeGeneratorWizard() {
  const { userProfile, subscription, isProfileLoading } = useUserStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  
  // Step 1 data
  const [selectedRole, setSelectedRole] = useState<ResumeRole | null>(null)
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  
  // Step 2 data
  const [selectedRepos, setSelectedRepos] = useState<string[]>([])
  
  // Step 3 data (AI generation)
  const [generatedResumeId, setGeneratedResumeId] = useState<string | null>(null)
  
  // Loading state
  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="size-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mx-auto" />
          <p className="text-neutral-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (!userProfile || !subscription) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-neutral-900 font-medium">Unable to load your profile</p>
          <p className="text-neutral-600">Please refresh the page or contact support</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`size-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                currentStep >= step
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div
                className={`w-16 h-0.5 transition-colors ${
                  currentStep > step ? 'bg-neutral-900' : 'bg-neutral-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
        {currentStep === 1 && (
          <StepOne
            userProfile={userProfile}
            subscription={subscription}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            experienceLevel={experienceLevel}
            setExperienceLevel={setExperienceLevel}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepTwo
            githubUsername={userProfile.github_username}
            selectedRepos={selectedRepos}
            setSelectedRepos={setSelectedRepos}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <StepThree
            selectedRepos={selectedRepos}
            role={selectedRole!}
            experienceLevel={experienceLevel!}
            jobDescription={jobDescription}
            onSuccess={(resumeId) => {
              // console.log('Received resumeId in wizard:', resumeId);
              setGeneratedResumeId(resumeId)
              setCurrentStep(4)
            }}
            onError={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <StepFour
            resumeId={generatedResumeId!}
            subscription={subscription}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  )
}