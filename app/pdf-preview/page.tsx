'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUserStore } from '@/lib/store'
import { Loader2, ArrowLeft, Download, RefreshCw, Eye } from 'lucide-react'
import Link from 'next/link'
import { generateResumeHTML } from '@/lib/resume-html-generator'

function PDFPreviewContent() {
    const searchParams = useSearchParams()
    const resumeId = searchParams.get('id')
    const { userProfile } = useUserStore()

    const [resume, setResume] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [htmlContent, setHtmlContent] = useState<string>('')

    useEffect(() => {
        if (resumeId) {
            fetchResume()
        } else {
            setLoading(false)
        }
    }, [resumeId])

    // Generate HTML when resume or userProfile changes
    useEffect(() => {
        if (resume && userProfile) {
            const html = generateResumeHTML(resume, userProfile)
            setHtmlContent(html)
        }
    }, [resume, userProfile])

    const fetchResume = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`/api/resume/${resumeId}`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to fetch resume')
            }
            const data = await response.json()
            setResume(data.data)
        } catch (err: any) {
            console.error('Error fetching resume:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!resumeId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-100">
                <div className="text-center">
                    <p className="text-neutral-600">No resume ID provided</p>
                    <p className="text-sm text-neutral-500 mt-2">URL should be: /pdf-preview?id=YOUR_RESUME_ID</p>
                    <Link href="/dashboard" className="text-blue-600 hover:underline mt-4 block">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-100">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="size-8 animate-spin text-neutral-400" />
                    <p className="text-sm text-neutral-600">Loading resume...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-100">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Error: {error}</p>
                    <button
                        onClick={fetchResume}
                        className="text-blue-600 hover:underline mt-2 block mx-auto"
                    >
                        Try Again
                    </button>
                    <Link href="/dashboard" className="text-neutral-600 hover:underline mt-2 block">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    if (!resume) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-100">
                <div className="text-center">
                    <p className="text-neutral-600">Resume not found</p>
                    <Link href="/dashboard" className="text-blue-600 hover:underline mt-2 block">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-200">
            {/* Toolbar */}
            <div className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/dashboard/resume/${resumeId}`} className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900">
                            <ArrowLeft className="size-4" />
                            Back to Editor
                        </Link>
                        <span className="text-neutral-400">|</span>
                        <div className="flex items-center gap-2">
                            <Eye className="size-4 text-green-600" />
                            <h1 className="font-semibold text-neutral-900">PDF Preview</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchResume}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-md hover:bg-neutral-50"
                        >
                            <RefreshCw className="size-4" />
                            Refresh
                        </button>
                        <Link
                            href={`/dashboard/resume/${resumeId}`}
                            className="flex items-center gap-2 px-4 py-1.5 text-sm bg-neutral-900 text-white rounded-md hover:bg-neutral-800"
                        >
                            <Download className="size-4" />
                            Export PDF
                        </Link>
                    </div>
                </div>
            </div>

            {/* PDF Preview - A4 Page using iframe with same HTML as PDF export */}
            <div className="py-8 px-4 flex justify-center">
                <div
                    className="bg-white shadow-2xl overflow-hidden"
                    style={{ width: '794px', minHeight: '1123px' }}
                >
                    {htmlContent ? (
                        <iframe
                            srcDoc={htmlContent}
                            style={{ width: '100%', height: '1123px', border: 'none' }}
                            title="Resume Preview"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="size-8 animate-spin text-neutral-400" />
                        </div>
                    )}
                </div>
            </div>

            {/* Info Bar */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-sm shadow-lg flex items-center gap-2">
                <Eye className="size-4" />
                This is exactly how your PDF will look • A4 size (794 × 1123 px)
            </div>
        </div>
    )
}

export default function PDFPreviewPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-neutral-100">
                <Loader2 className="size-8 animate-spin text-neutral-400" />
            </div>
        }>
            <PDFPreviewContent />
        </Suspense>
    )
}
