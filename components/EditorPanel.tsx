'use client'

import { useState } from 'react'
import { GripVertical, Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SubHeading } from '@/components/SubHeading'

interface Project {
  repo_name: string
  repo_url: string
  description: string
  bullets: string[]
  technologies: string[]
}

interface Skills {
  frontend?: string[]
  backend?: string[]
  databases?: string[]
  tools?: string[]
  other?: string[]
}

interface Content {
  projects: Project[]
  skills: Skills
  problems_solved: string[]
}

interface EditorPanelProps {
  content: Content
  onContentChange: (newContent: Content) => void
}

export default function EditorPanel({ content, onContentChange }: EditorPanelProps) {
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null)
  const [editingBulletIndex, setEditingBulletIndex] = useState<{ projectIdx: number; bulletIdx: number } | null>(null)

  // Update project
  const handleUpdateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...content.projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    onContentChange({ ...content, projects: updatedProjects })
  }

  // Update bullet
  const handleUpdateBullet = (projectIdx: number, bulletIdx: number, value: string) => {
    const updatedProjects = [...content.projects]
    updatedProjects[projectIdx].bullets[bulletIdx] = value
    onContentChange({ ...content, projects: updatedProjects })
  }

  // Add bullet
  const handleAddBullet = (projectIdx: number) => {
    const updatedProjects = [...content.projects]
    updatedProjects[projectIdx].bullets.push('')
    onContentChange({ ...content, projects: updatedProjects })
    setEditingBulletIndex({ projectIdx, bulletIdx: updatedProjects[projectIdx].bullets.length - 1 })
  }

  // Remove bullet
  const handleRemoveBullet = (projectIdx: number, bulletIdx: number) => {
    const updatedProjects = [...content.projects]
    updatedProjects[projectIdx].bullets.splice(bulletIdx, 1)
    onContentChange({ ...content, projects: updatedProjects })
  }

  // Remove project
  const handleRemoveProject = (index: number) => {
    const updatedProjects = content.projects.filter((_, idx) => idx !== index)
    onContentChange({ ...content, projects: updatedProjects })
  }

  // Update skills
  const handleUpdateSkills = (category: keyof Skills, skills: string[]) => {
    const updatedSkills = { ...content.skills, [category]: skills }
    onContentChange({ ...content, skills: updatedSkills })
  }

  // Update technologies
  const handleUpdateTechnologies = (projectIdx: number, technologies: string[]) => {
    const updatedProjects = [...content.projects]
    updatedProjects[projectIdx].technologies = technologies
    onContentChange({ ...content, projects: updatedProjects })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <SubHeading>Edit Resume</SubHeading>
        <p className="text-sm text-neutral-600 mt-1">
          Click on any section to edit. Changes are saved automatically.
        </p>
      </div>

      <Accordion type="multiple" defaultValue={['projects', 'skills']} className="space-y-4">
        {/* Projects Section */}
        <AccordionItem value="projects" className="border border-neutral-200 rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <GripVertical className="size-4 text-neutral-400" />
              <span className="font-medium">Projects ({content.projects.length})</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {content.projects.map((project, projectIdx) => (
              <div key={projectIdx} className="p-4 border border-neutral-200 rounded-lg space-y-3 bg-neutral-50">
                {/* Project Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    {editingProjectIndex === projectIdx ? (
                      <Input
                        value={project.repo_name}
                        onChange={(e) => handleUpdateProject(projectIdx, 'repo_name', e.target.value)}
                        onBlur={() => setEditingProjectIndex(null)}
                        autoFocus
                        className="font-medium"
                      />
                    ) : (
                      <div
                        onClick={() => setEditingProjectIndex(projectIdx)}
                        className="font-medium text-neutral-900 cursor-pointer hover:text-neutral-600 transition-colors"
                      >
                        {project.repo_name}
                      </div>
                    )}
                    
                    <Textarea
                      value={project.description}
                      onChange={(e) => handleUpdateProject(projectIdx, 'description', e.target.value)}
                      className="text-sm resize-none"
                      rows={2}
                      placeholder="Project description..."
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveProject(projectIdx)}
                  >
                    <Trash2 className="size-4 text-red-600" />
                  </Button>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <Label className="text-xs text-neutral-600">Technologies</Label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => handleUpdateTechnologies(
                      projectIdx,
                      e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    )}
                    placeholder="React, Node.js, MongoDB..."
                    className="text-sm"
                  />
                </div>

                {/* Bullets */}
                <div className="space-y-2">
                  <Label className="text-xs text-neutral-600">Bullet Points</Label>
                  <div className="space-y-2">
                    {project.bullets.map((bullet, bulletIdx) => (
                      <div key={bulletIdx} className="flex items-start gap-2">
                        {editingBulletIndex?.projectIdx === projectIdx && 
                         editingBulletIndex?.bulletIdx === bulletIdx ? (
                          <>
                            <Textarea
                              value={bullet}
                              onChange={(e) => handleUpdateBullet(projectIdx, bulletIdx, e.target.value)}
                              className="flex-1 text-sm resize-none"
                              rows={3}
                              autoFocus
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingBulletIndex(null)}
                            >
                              <Check className="size-4 text-green-600" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <div
                              onClick={() => setEditingBulletIndex({ projectIdx, bulletIdx })}
                              className="flex-1 text-sm text-neutral-700 cursor-pointer hover:text-neutral-900 transition-colors p-2 rounded hover:bg-white"
                            >
                              • {bullet}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveBullet(projectIdx, bulletIdx)}
                            >
                              <X className="size-4 text-neutral-400" />
                            </Button>
                          </>
                        )}
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddBullet(projectIdx)}
                      className="w-full"
                    >
                      <Plus className="size-4 mr-2" />
                      Add Bullet Point
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Skills Section */}
        <AccordionItem value="skills" className="border border-neutral-200 rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <GripVertical className="size-4 text-neutral-400" />
              <span className="font-medium">Skills</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {Object.entries(content.skills).map(([category, skills]) => (
              <div key={category} className="space-y-2">
                <Label className="text-sm font-medium text-neutral-700 capitalize">
                  {category}
                </Label>
                <Input
                  value={skills?.join(', ') || ''}
                  onChange={(e) => handleUpdateSkills(
                    category as keyof Skills,
                    e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  )}
                  placeholder={`Add ${category} skills...`}
                  className="text-sm"
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Problems Solved Section */}
        <AccordionItem value="problems" className="border border-neutral-200 rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <GripVertical className="size-4 text-neutral-400" />
              <span className="font-medium">Problems Solved ({content.problems_solved.length})</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {content.problems_solved.map((problem, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Textarea
                  value={problem}
                  onChange={(e) => {
                    const updated = [...content.problems_solved]
                    updated[idx] = e.target.value
                    onContentChange({ ...content, problems_solved: updated })
                  }}
                  className="flex-1 text-sm resize-none"
                  rows={2}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const updated = content.problems_solved.filter((_, i) => i !== idx)
                    onContentChange({ ...content, problems_solved: updated })
                  }}
                >
                  <Trash2 className="size-4 text-red-600" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onContentChange({
                  ...content,
                  problems_solved: [...content.problems_solved, '']
                })
              }}
              className="w-full"
            >
              <Plus className="size-4 mr-2" />
              Add Problem
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}