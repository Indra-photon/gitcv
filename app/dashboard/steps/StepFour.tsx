'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ChevronLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SubHeading } from '@/components/SubHeading'
import { TEMPLATE_TYPES, TemplateType } from '@/constants/limit'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface StepFourProps {
  resumeId: string
  subscription: any
  onBack: () => void
}

const TEMPLATES = [
  {
    value: TEMPLATE_TYPES.DEFAULT,
    label: 'Classic ATS',
    description: 'Traditional single-column layout. Clean and professional.',
    free: true,
    layout: 'single-column'
  },
  {
    value: TEMPLATE_TYPES.MODERN,
    label: 'Modern Professional',
    description: 'Two-column layout with sidebar. Contemporary and compact.',
    free: true,
    layout: 'two-column'
  },
  {
    value: TEMPLATE_TYPES.MINIMAL,
    label: 'Minimal Clean',
    description: 'Spacious single-column with maximum readability.',
    free: false,
    layout: 'single-column-spacious'
  },
  {
    value: TEMPLATE_TYPES.CREATIVE,
    label: 'Creative Designer',
    description: 'Bold two-column with accent colors for creative roles.',
    free: false,
    layout: 'two-column-accent'
  },
  {
    value: TEMPLATE_TYPES.ACADEMIC,
    label: 'Academic Research',
    description: 'Traditional format optimized for academic positions.',
    free: false,
    layout: 'single-column-traditional'
  },
  {
    value: TEMPLATE_TYPES.EXECUTIVE,
    label: 'Executive Leadership',
    description: 'Premium two-column design for senior roles.',
    free: false,
    layout: 'two-column-premium'
  }
]

function TemplatePreview({ 
  template, 
  isSelected, 
  isLocked 
}: { 
  template: typeof TEMPLATES[0]
  isSelected: boolean
  isLocked: boolean
}) {
  return (
    <div
      className={cn(
        'relative aspect-[8.5/11] bg-white border-2 rounded-lg overflow-hidden transition-colors',
        isSelected ? 'border-neutral-900 shadow-md' : 'border-neutral-200 hover:border-neutral-300',
        isLocked && 'opacity-60'
      )}
    >
      {/* Selected Check */}
      {isSelected && !isLocked && (
        <div className="absolute top-2 right-2 size-6 bg-neutral-900 rounded-full flex items-center justify-center z-10">
          <Check className="size-4 text-white" />
        </div>
      )}

      {/* Template Content */}
      {template.layout === 'single-column' && (
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="space-y-1">
            <div className="h-4 w-32 bg-neutral-900 rounded" />
            <div className="h-2 w-24 bg-neutral-400 rounded" />
          </div>
          {/* Summary */}
          <div className="space-y-1">
            <div className="h-2 w-full bg-neutral-200 rounded" />
            <div className="h-2 w-4/5 bg-neutral-200 rounded" />
          </div>
          {/* Skills */}
          <div className="flex gap-1 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-3 w-10 bg-neutral-300 rounded" />
            ))}
          </div>
          {/* Projects */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1 border-l-2 border-neutral-400 pl-2">
              <div className="h-2.5 w-20 bg-neutral-600 rounded" />
              <div className="h-2 w-full bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {template.layout === 'two-column' && (
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/3 bg-neutral-100 p-3 space-y-3">
            <div className="size-10 bg-neutral-400 rounded-full mx-auto" />
            <div className="h-2.5 w-full bg-neutral-600 rounded mx-auto" />
            <div className="space-y-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-2 w-full bg-neutral-400 rounded" />
              ))}
            </div>
            <div className="pt-2 space-y-1">
              <div className="h-2 w-12 bg-neutral-600 rounded" />
              <div className="flex gap-1 flex-wrap">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-2 w-8 bg-neutral-300 rounded" />
                ))}
              </div>
            </div>
          </div>
          {/* Main content */}
          <div className="flex-1 p-3 space-y-2">
            <div className="h-3 w-24 bg-neutral-600 rounded" />
            <div className="space-y-1">
              <div className="h-2 w-full bg-neutral-200 rounded" />
              <div className="h-2 w-3/4 bg-neutral-200 rounded" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1 pt-1">
                <div className="h-2 w-16 bg-neutral-500 rounded" />
                <div className="h-1.5 w-full bg-neutral-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {template.layout === 'single-column-spacious' && (
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="h-5 w-36 bg-neutral-900 rounded mx-auto" />
            <div className="h-2 w-28 bg-neutral-400 rounded mx-auto" />
          </div>
          {/* Summary */}
          <div className="space-y-2">
            <div className="h-2 w-full bg-neutral-200 rounded" />
            <div className="h-2 w-5/6 bg-neutral-200 rounded" />
          </div>
          {/* Skills */}
          <div className="flex gap-2 flex-wrap justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-3 w-12 bg-neutral-300 rounded" />
            ))}
          </div>
          {/* Sections */}
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2 pt-2 border-t border-neutral-200">
              <div className="h-3 w-20 bg-neutral-700 rounded" />
              <div className="h-2 w-full bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {template.layout === 'two-column-accent' && (
        <div className="flex h-full">
          {/* Sidebar with accent */}
          <div className="w-1/3 bg-blue-50 p-3 space-y-3 border-r-4 border-blue-600">
            <div className="size-10 bg-blue-200 rounded-full mx-auto" />
            <div className="h-2.5 w-full bg-blue-700 rounded mx-auto" />
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-2 w-full bg-blue-300 rounded" />
              ))}
            </div>
            <div className="pt-2 space-y-1">
              <div className="h-2 w-12 bg-blue-700 rounded" />
              <div className="flex gap-1 flex-wrap">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-2 w-8 bg-blue-400 rounded" />
                ))}
              </div>
            </div>
          </div>
          {/* Main content */}
          <div className="flex-1 p-3 space-y-2">
            <div className="h-3 w-24 bg-blue-600 rounded" />
            <div className="space-y-1">
              <div className="h-2 w-full bg-neutral-200 rounded" />
              <div className="h-2 w-3/4 bg-neutral-200 rounded" />
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="space-y-1 pt-1">
                <div className="h-2 w-16 bg-neutral-600 rounded" />
                <div className="h-1.5 w-full bg-neutral-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {template.layout === 'single-column-traditional' && (
        <div className="p-4 space-y-2">
          {/* Header - Traditional style */}
          <div className="space-y-1 text-center border-b-2 border-neutral-900 pb-2">
            <div className="h-4 w-40 bg-neutral-900 rounded mx-auto" />
            <div className="h-2 w-32 bg-neutral-500 rounded mx-auto" />
          </div>
          {/* Education */}
          <div className="space-y-1 pt-2">
            <div className="h-2.5 w-24 bg-neutral-800 rounded" />
            <div className="h-2 w-full bg-neutral-200 rounded" />
            <div className="h-2 w-3/4 bg-neutral-200 rounded" />
          </div>
          {/* Publications/Research */}
          <div className="space-y-1 pt-2">
            <div className="h-2.5 w-32 bg-neutral-800 rounded" />
            {[1, 2].map((i) => (
              <div key={i} className="h-2 w-full bg-neutral-200 rounded" />
            ))}
          </div>
          {/* Experience */}
          <div className="space-y-1 pt-2">
            <div className="h-2.5 w-28 bg-neutral-800 rounded" />
            <div className="h-2 w-full bg-neutral-200 rounded" />
          </div>
        </div>
      )}

      {template.layout === 'two-column-premium' && (
        <div className="flex h-full">
          {/* Premium Sidebar */}
          <div className="w-2/5 bg-gradient-to-b from-neutral-800 to-neutral-900 p-3 space-y-3 text-white">
            <div className="size-12 bg-white/20 rounded-full mx-auto" />
            <div className="h-3 w-full bg-white rounded mx-auto" />
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-2 w-full bg-white/60 rounded" />
              ))}
            </div>
            <div className="pt-2 space-y-1">
              <div className="h-2 w-12 bg-white rounded" />
              <div className="flex gap-1 flex-wrap">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-2 w-8 bg-white/40 rounded" />
                ))}
              </div>
            </div>
          </div>
          {/* Main content */}
          <div className="flex-1 p-3 space-y-2">
            <div className="h-4 w-32 bg-neutral-900 rounded" />
            <div className="space-y-1">
              <div className="h-2 w-full bg-neutral-200 rounded" />
              <div className="h-2 w-4/5 bg-neutral-200 rounded" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1 pt-1 border-l-2 border-neutral-300 pl-2">
                <div className="h-2 w-20 bg-neutral-700 rounded" />
                <div className="h-1.5 w-full bg-neutral-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="size-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto">
              <Lock className="size-6 text-white" />
            </div>
            <p className="text-sm font-medium text-neutral-900">Premium</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function StepFour({ resumeId, subscription, onBack }: StepFourProps) {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(TEMPLATE_TYPES.DEFAULT)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const isPaid = subscription.tier !== 'free'

  const handleTemplateSelect = (template: TemplateType) => {
    const templateConfig = TEMPLATES.find((t) => t.value === template)

    if (!templateConfig?.free && !isPaid) {
      setShowPaywall(true)
      return
    }

    setSelectedTemplate(template)
  }

  const handleContinueToEditor = async () => {
    setIsUpdating(true)

    try {
      // console.log('Reseume ID being updated:', resumeId);
      
      // Update resume with selected template
      const response = await fetch(`/api/resume/${resumeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: selectedTemplate
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update template')
      }

      toast.success('Template selected successfully')

      // Navigate to editor
      router.push(`/dashboard/resume/${resumeId}/edit`)
    } catch (error: any) {
      console.error('Error updating template:', error)
      toast.error(error.message || 'Failed to update template')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <SubHeading className="text-balance">Choose Your Template</SubHeading>
        <p className="text-sm text-neutral-600 text-pretty">
          {isPaid
            ? 'Select from 6 professional templates'
            : 'Select from 2 free templates or upgrade for 4 more premium options'}
        </p>
      </div>

      {/* Template Grid */}
      <RadioGroup value={selectedTemplate} onValueChange={handleTemplateSelect}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template) => {
            const isLocked = !template.free && !isPaid
            const isSelected = selectedTemplate === template.value

            return (
              <label
                key={template.value}
                onClick={() => handleTemplateSelect(template.value)}
                className={cn(
                  'cursor-pointer block',  // Update classes
                  isLocked && 'cursor-not-allowed'
                )}
              >
                <TemplatePreview
                  template={template}
                  isSelected={isSelected}
                  isLocked={isLocked}
                />
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value={template.value}
                      id={template.value}
                      disabled={isLocked}
                      className="sr-only"
                    />
                    <h3
                      className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-neutral-900' : 'text-neutral-700'
                      )}
                    >
                      {template.label}
                    </h3>
                    {!template.free && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-900 rounded">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 text-pretty">{template.description}</p>
                </div>
              </label>
            )
          })}
        </div>
      </RadioGroup>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="size-4 mr-2" />
          Back
        </Button>

        <Button onClick={handleContinueToEditor} disabled={isUpdating} size="lg">
          {isUpdating ? 'Updating...' : 'Continue to Editor'}
        </Button>
      </div>

      {/* Paywall Modal */}
      <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade to Premium</DialogTitle>
            <DialogDescription>
              Unlock 4 additional professional templates and premium features
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-sm">6 professional templates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-sm">Unlimited resume editing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-sm">Job description AI matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-sm">Permanent PDF storage</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPaywall(false)} className="flex-1">
                Maybe Later
              </Button>
              <Button onClick={() => router.push('/pricing')} className="flex-1">
                Upgrade Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}