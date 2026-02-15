'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Download, Loader2, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Container } from '@/components/Container'
import { TEMPLATE_TYPES } from '@/constants/limit'
import { useUserStore } from '@/lib/store' // Import Zustand store
import EditorPanel from './EditorPanel'
import PreviewPanel from './PreviewPanel'
import { toast } from 'sonner'

interface ResumeData {
  _id: string
  title: string
  role: string
  template: string
  selected_repos: string[]
  content: {
    projects: any[]
    skills: any
    problems_solved: string[]
  }
  status: string
  pdf_url: string | null
  pdf_expires_at: string | null
  created_at: string
  updated_at: string
}

interface ResumeEditorProps {
  initialResume: ResumeData
}

export default function ResumeEditor({ initialResume }: ResumeEditorProps) {
  const router = useRouter()


  // Get user data from Zustand store
  const { userProfile, subscription } = useUserStore()

  // Check if user has Pro subscription
  const isPaid = subscription?.tier !== 'free'

  const [resume, setResume] = useState(initialResume)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Auto-save every 30 seconds if there are changes
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const autoSaveTimer = setTimeout(() => {
      handleSave()
    }, 30000)

    return () => clearTimeout(autoSaveTimer)
  }, [hasUnsavedChanges, resume])

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    try {
      const response = await fetch(`/api/resume/${resume._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resume.title,
          content: resume.content,
          template: resume.template
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save resume')
      }

      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      toast.success('Resume saved successfully')
    } catch (error: any) {
      console.error('Error saving resume:', error)
      toast.error(error.message || 'Failed to save resume')
    } finally {
      setIsSaving(false)
    }
  }, [resume])

  const handleExportPDF = async () => {
    setIsExporting(true)

    try {
      toast.success('Generating PDF...')

      // Call the API endpoint with resume data
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeId: resume._id,
          resumeData: {
            title: resume.title,
            role: resume.role,
            content: resume.content,
          },
          userData: userProfile,
          template: resume.template, // Pass the template for proper styling
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate PDF')
      }

      // Get the PDF blob from response
      const blob = await response.blob()

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${resume.title || 'resume'}.pdf`
      document.body.appendChild(link)
      link.click()

      // Delay cleanup so the browser has time to read the blob before revoking
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 1000)

      setIsExporting(false)
      toast.success('PDF downloaded successfully!')
    } catch (error: any) {
      console.error('Error exporting PDF:', error)
      toast.error('Failed to export PDF: ' + error.message)
      setIsExporting(false)
    }
  }

  const handleTitleChange = (newTitle: string) => {
    setResume({ ...resume, title: newTitle })
    setHasUnsavedChanges(true)
  }

  const handleTemplateChange = (newTemplate: string) => {
    // Check if trying to select a Pro template without Pro subscription
    const proTemplates = [TEMPLATE_TYPES.HARVARD]
    if (proTemplates.includes(newTemplate as any) && !isPaid) {
      toast.error('Upgrade to Pro to access this template')
      router.push('/pricing')
      return
    }

    setResume({ ...resume, template: newTemplate })
    setHasUnsavedChanges(true)
  }

  const handleContentChange = (newContent: any) => {
    setResume({ ...resume, content: newContent })
    setHasUnsavedChanges(true)
  }

  const getTimeSinceLastSave = () => {
    if (!lastSaved) return null

    const now = new Date()
    const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000)

    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
    return `${Math.floor(diff / 3600)} hours ago`
  }

  // Show loading if user profile not loaded yet
  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <div className="text-center space-y-3">
          <Loader2 className="size-8 animate-spin text-neutral-400 mx-auto" />
          <p className="text-sm text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-dvh">
      {/* Top Bar */}
      <div className="border-b border-neutral-200 bg-white">
        <Container className="py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="size-4 mr-2" />
                  Back
                </Button>
              </Link>

              <Separator orientation="vertical" className="h-6" />

              <Input
                value={resume.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="max-w-xs font-medium"
                placeholder="Resume title..."
              />
            </div>

            {/* Right: Template + Actions */}
            <div className="flex items-center gap-3">
              {/* Template Selector */}
              <Select value={resume.template} onValueChange={handleTemplateChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TEMPLATE_TYPES.DEFAULT}>
                    <span className="flex items-center gap-2">
                      Classic ATS
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-100 text-green-800 rounded">Free</span>
                    </span>
                  </SelectItem>
                  <SelectItem value={TEMPLATE_TYPES.HARVARD} disabled={!isPaid}>
                    <span className="flex items-center gap-2">
                      Harvard ATS
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-900 rounded">Pro</span>
                    </span>
                  </SelectItem>
                  <SelectItem value={TEMPLATE_TYPES.MODERN} disabled>
                    <span className="flex items-center gap-2">
                      Modern Professional
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-neutral-200 text-neutral-600 rounded">Coming Soon</span>
                    </span>
                  </SelectItem>
                  <SelectItem value={TEMPLATE_TYPES.MINIMAL} disabled>
                    <span className="flex items-center gap-2">
                      Minimal Clean
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-neutral-200 text-neutral-600 rounded">Coming Soon</span>
                    </span>
                  </SelectItem>
                  <SelectItem value={TEMPLATE_TYPES.CREATIVE} disabled>
                    <span className="flex items-center gap-2">
                      Creative Designer
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-neutral-200 text-neutral-600 rounded">Coming Soon</span>
                    </span>
                  </SelectItem>
                  <SelectItem value={TEMPLATE_TYPES.ACADEMIC} disabled>
                    <span className="flex items-center gap-2">
                      Academic Research
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-neutral-200 text-neutral-600 rounded">Coming Soon</span>
                    </span>
                  </SelectItem>
                  <SelectItem value={TEMPLATE_TYPES.EXECUTIVE} disabled>
                    <span className="flex items-center gap-2">
                      Executive Leadership
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-neutral-200 text-neutral-600 rounded">Coming Soon</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="h-6" />

              {/* Save Status */}
              <div className="text-sm text-neutral-600 min-w-[120px]">
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-3 animate-spin" />
                    Saving...
                  </span>
                ) : hasUnsavedChanges ? (
                  <span className="text-amber-600">Unsaved changes</span>
                ) : lastSaved ? (
                  <span className="flex items-center gap-2">
                    <Check className="size-3 text-green-600" />
                    {getTimeSinceLastSave()}
                  </span>
                ) : null}
              </div>

              {/* Action Buttons */}
              <Button
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
                variant="outline"
              >
                <Save className="size-4 mr-2" />
                Save
              </Button>

              <Link href={`/pdf-preview?id=${resume._id}`} target="_blank">
                <Button variant="outline">
                  Preview PDF
                </Button>
              </Link>

              <Button onClick={handleExportPDF} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="size-4 mr-2" />
                    Export PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Split View */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Left: Editor Panel */}
          <div className="w-2/5 border-r border-neutral-200 bg-white overflow-y-auto">
            <EditorPanel
              content={resume.content}
              onContentChange={handleContentChange}
            />
          </div>

          {/* Right: Preview Panel */}
          <div className="flex-1 bg-neutral-100 overflow-y-auto">
            <PreviewPanel
              resume={resume}
              userData={userProfile} // Pass from Zustand
            />
          </div>
        </div>
      </div>
    </div>
  )
}