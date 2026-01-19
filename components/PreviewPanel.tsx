'use client'

import { useState } from 'react'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TEMPLATE_TYPES } from '@/constants/limit'
import ClassicTemplate from './templates/ClassicTemplate'
// import ModernTemplate from './templates/ModernTemplate'
// import MinimalTemplate from './templates/MinimalTemplate'
// import CreativeTemplate from './templates/CreativeTemplate'
// import AcademicTemplate from './templates/AcademicTemplate'
// import ExecutiveTemplate from './templates/ExecutiveTemplate'

interface ResumeData {
  _id: string
  title: string
  role: string
  template: string
  content: {
    projects: any[]
    skills: any
    problems_solved: string[]
  }
}

interface PreviewPanelProps {
  resume: ResumeData,
  userData: any
}

export default function PreviewPanel({ resume, userData }: PreviewPanelProps) {
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => {
    if (zoom < 150) setZoom(zoom + 10)
  }

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 10)
  }

  const renderTemplate = () => {
    const templateProps = {
      content: resume.content,
      role: resume.role,
      userData
    }

    switch (resume.template) {
      case TEMPLATE_TYPES.DEFAULT:
        return <ClassicTemplate {...templateProps} />
    //   case TEMPLATE_TYPES.MODERN:
    //     return <ModernTemplate {...templateProps} />
    //   case TEMPLATE_TYPES.MINIMAL:
    //     return <MinimalTemplate {...templateProps} />
    //   case TEMPLATE_TYPES.CREATIVE:
    //     return <CreativeTemplate {...templateProps} />
    //   case TEMPLATE_TYPES.ACADEMIC:
    //     return <AcademicTemplate {...templateProps} />
    //   case TEMPLATE_TYPES.EXECUTIVE:
    //     return <ExecutiveTemplate {...templateProps} />
      default:
        return <ClassicTemplate {...templateProps} />
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Zoom Controls */}
      <div className="p-4 bg-white border-b border-neutral-200 flex items-center justify-between">
        <div className="text-sm text-neutral-600">
          Preview
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
          >
            <ZoomOut className="size-4" />
          </Button>
          <span className="text-sm text-neutral-600 min-w-[4rem] text-center tabular-nums">
            {zoom}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 150}
          >
            <ZoomIn className="size-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-[850px] mx-auto">
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {/* A4 Paper Container */}
            <div className="bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}