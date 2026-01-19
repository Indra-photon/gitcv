'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { SubHeading } from '@/components/SubHeading'
import { toast } from 'sonner'

interface StepThreeProps {
  selectedRepos: string[]
  role: string
  experienceLevel: string
  jobDescription: string
  onSuccess: (resumeId: string) => void
  onError: () => void
}

const PROGRESS_STEPS = [
  { label: 'Analyzing repositories', duration: 3000 },
  { label: 'Extracting technologies', duration: 4000 },
  { label: 'Generating project descriptions', duration: 8000 },
  { label: 'Creating skills summary', duration: 6000 },
  { label: 'Formatting resume', duration: 4000 }
]

export default function StepThree({
  selectedRepos,
  role,
  experienceLevel,
  jobDescription,
  onSuccess,
  onError
}: StepThreeProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const generateResume = async () => {
      try {
        // Start progress animation
        let totalDuration = 0
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 95) return prev
            return prev + 1
          })
        }, 250)

        // Animate through steps
        for (let i = 0; i < PROGRESS_STEPS.length; i++) {
          setCurrentStepIndex(i)
          await new Promise((resolve) =>
            setTimeout(resolve, PROGRESS_STEPS[i].duration / PROGRESS_STEPS.length)
          )
        }

        // Make API call
        const response = await fetch('/api/resume/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            selected_repos: selectedRepos,
            role,
            experience_level: experienceLevel,
            job_description: jobDescription || undefined
          })
        })

        const data = await response.json()
        console.log('Resume generation response:', data);
        

        clearInterval(progressInterval)

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate resume')
        }

        // Success
        setProgress(100)
        setCurrentStepIndex(PROGRESS_STEPS.length)
        setStatus('success')

        // Wait a moment before transitioning
        setTimeout(() => {
          // console.log('Extracted resume ID path 1:', data.data?.resume_id);
          const resumeId = data.data?.resume_id; // Try both paths
          onSuccess(resumeId)
        }, 1500)
      } catch (error: any) {
        console.error('Resume generation error:', error)
        setStatus('error')
        setErrorMessage(error.message || 'An unexpected error occurred')
        toast.error(error.message || 'Failed to generate resume')
      }
    }

    generateResume()
  }, [selectedRepos, role, experienceLevel, jobDescription, onSuccess])

  const handleRetry = () => {
    window.location.reload()
  }

  const handleGoBack = () => {
    onError()
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <SubHeading className="text-balance">
            {status === 'loading' && 'Generating Your Resume'}
            {status === 'success' && 'Resume Generated Successfully'}
            {status === 'error' && 'Generation Failed'}
          </SubHeading>
          <p className="text-sm text-neutral-600 text-pretty">
            {status === 'loading' && 'This may take 10-25 seconds. Please do not close this page.'}
            {status === 'success' && 'Your resume is ready! Redirecting to template selection...'}
            {status === 'error' && 'Something went wrong. Please try again.'}
          </p>
        </div>

        {/* Progress Bar */}
        {status === 'loading' && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-neutral-500 text-center tabular-nums">
              {progress}% complete
            </p>
          </div>
        )}

        {/* Status Icon */}
        <div className="flex justify-center">
          {status === 'loading' && (
            <div className="size-20 rounded-full bg-neutral-100 flex items-center justify-center">
              <Loader2 className="size-10 text-neutral-600 animate-spin" />
            </div>
          )}
          {status === 'success' && (
            <div className="size-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="size-10 text-green-600" />
            </div>
          )}
          {status === 'error' && (
            <div className="size-20 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="size-10 text-red-600" />
            </div>
          )}
        </div>

        {/* Progress Steps */}
        {status === 'loading' && (
          <div className="space-y-3">
            {PROGRESS_STEPS.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  index < currentStepIndex
                    ? 'bg-green-50'
                    : index === currentStepIndex
                    ? 'bg-neutral-100'
                    : 'bg-neutral-50'
                }`}
              >
                {index < currentStepIndex ? (
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0" />
                ) : index === currentStepIndex ? (
                  <Loader2 className="size-5 text-neutral-600 animate-spin flex-shrink-0" />
                ) : (
                  <div className="size-5 rounded-full border-2 border-neutral-300 flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    index <= currentStepIndex ? 'text-neutral-900 font-medium' : 'text-neutral-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-red-900">Generation Error</p>
                <p className="text-sm text-red-700 text-pretty">{errorMessage}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleGoBack} className="flex-1">
                Go Back
              </Button>
              <Button onClick={handleRetry} className="flex-1">
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Info Card */}
        {status === 'loading' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-blue-900">Processing Time</p>
                <p className="text-sm text-blue-700 text-pretty">
                  AI generation typically takes 10-25 seconds depending on the number of repositories and complexity.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}