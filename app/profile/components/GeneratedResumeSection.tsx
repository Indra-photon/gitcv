'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Paragraph } from '@/components/Paragraph'
import { 
  FileText,
  Calendar,
  Download,
  Eye,
  AlertCircle,
  Loader2
} from 'lucide-react'
import localFont from "next/font/local"
import { cn } from '@/lib/utils'

const CalSans = localFont({
  src: [{ path: "../../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
})

interface Resume {
  _id: string
  title: string
  role: string
  template: string
  status: string
  pdf_url: string | null
  pdf_expires_at: string | null
  created_at: string
  updated_at: string
}

export default function GeneratedResumeSection() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/resume')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch resumes')
      }

      setResumes(data.data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      frontend: 'bg-blue-100 text-blue-700',
      backend: 'bg-green-100 text-green-700',
      fullstack: 'bg-purple-100 text-purple-700',
      mobile: 'bg-orange-100 text-orange-700',
      devops: 'bg-red-100 text-red-700'
    }
    return colors[role.toLowerCase()] || 'bg-neutral-100 text-neutral-700'
  }

  const isPdfExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false
    return new Date(expiresAt) < new Date()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="size-8 animate-spin text-neutral-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-red-600 mt-0.5" />
          <div>
            <p className={cn("text-sm font-medium text-red-900", CalSans.className)}>Error loading resumes</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-neutral-200 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>Total Resumes</p>
                <p className={cn("text-3xl font-semibold text-neutral-900", CalSans.className)}>
                  {resumes.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-100">
                <FileText className="size-6 text-neutral-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>This Month</p>
                <p className={cn("text-3xl font-semibold text-neutral-900", CalSans.className)}>
                  {resumes.filter(r => {
                    const createdDate = new Date(r.created_at)
                    const now = new Date()
                    return createdDate.getMonth() === now.getMonth() && 
                           createdDate.getFullYear() === now.getFullYear()
                  }).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <Calendar className="size-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>Available PDFs</p>
                <p className={cn("text-3xl font-semibold text-neutral-900", CalSans.className)}>
                  {resumes.filter(r => r.pdf_url && !isPdfExpired(r.pdf_expires_at)).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <Download className="size-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumes List */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-neutral-900">
            <Paragraph className='text-neutral-900'>Your Resumes</Paragraph>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div 
                  key={resume._id}
                  className="p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                          <FileText className="size-5 text-neutral-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className={cn("text-base font-semibold text-neutral-900", CalSans.className)}>
                            {resume.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge className={cn("capitalize", getRoleBadgeColor(resume.role))}>
                              {resume.role}
                            </Badge>
                            <Badge variant="outline" className="capitalize text-neutral-600 border-neutral-300">
                              {resume.template}
                            </Badge>
                            <span className={cn("text-sm text-neutral-500", CalSans.className)}>
                              Created {formatDate(resume.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* PDF Status */}
                      {resume.pdf_expires_at && (
                        <div className={cn(
                          "flex items-center gap-2 text-sm px-3 py-2 rounded-lg",
                          isPdfExpired(resume.pdf_expires_at)
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        )}>
                          <AlertCircle className="size-4" />
                          <span className={CalSans.className}>
                            {isPdfExpired(resume.pdf_expires_at)
                              ? 'PDF expired'
                              : `PDF expires ${formatDate(resume.pdf_expires_at)}`
                            }
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={`/dashboard/resume/${resume._id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-neutral-700 border-neutral-300"
                        >
                          <Eye className="size-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      {resume.pdf_url && !isPdfExpired(resume.pdf_expires_at) && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="text-neutral-700 border-neutral-300"
                        >
                          <a href={resume.pdf_url} download aria-label="Download PDF">
                            <Download className="size-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-neutral-100 mb-4">
                <FileText className="size-8 text-neutral-400" />
              </div>
              <h3 className={cn("text-lg font-medium text-neutral-900 mb-2", CalSans.className)}>
                No resumes yet
              </h3>
              <p className={cn("text-sm text-neutral-500 mb-6", CalSans.className)}>
                Generate your first resume to get started
              </p>
              <Link href="/dashboard">
                <Button className="bg-neutral-900 hover:bg-neutral-800 text-white">
                  Generate Resume
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}