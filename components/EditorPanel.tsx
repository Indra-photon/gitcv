'use client'

import { useState } from 'react'
import { GripVertical, Plus, Trash2, Edit2, Check, X, Github, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SubHeading } from '@/components/SubHeading'
import RichTextEditor from './RichTextEditor'

interface Project {
  repo_name: string
  repo_url: string
  live_url?: string
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
                      <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                          <Input
                            value={project.repo_name}
                            onChange={(e) => handleUpdateProject(projectIdx, 'repo_name', e.target.value)}
                            autoFocus
                            className="font-medium h-9"
                            placeholder="Project Name"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-9 shrink-0"
                            onClick={() => setEditingProjectIndex(null)}
                            title="Done"
                          >
                            <Check className="size-4 text-green-600" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            value={project.repo_url}
                            onChange={(e) => handleUpdateProject(projectIdx, 'repo_url', e.target.value)}
                            className="text-sm"
                            placeholder="GitHub Link (e.g., https://github.com/username/repo)"
                          />
                          <Input
                            value={project.live_url || ''}
                            onChange={(e) => handleUpdateProject(projectIdx, 'live_url', e.target.value)}
                            className="text-sm"
                            placeholder="Live Link (e.g., https://myapp.com)"
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setEditingProjectIndex(projectIdx)}
                        className="font-medium text-neutral-900 cursor-pointer hover:text-neutral-600 transition-colors group select-none"
                      >
                        <div className="flex items-center gap-2">
                          {project.repo_name || "Untitled Project"}
                          <Edit2 className="size-3 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
                        </div>
                        <div className="text-xs font-normal mt-1 flex flex-wrap gap-3 items-center">
                          {project.repo_url ? (
                            <span className="flex items-center gap-1 text-neutral-700 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">
                              <Github className="size-3" />
                              <span className="truncate max-w-[150px]">{project.repo_url.replace('https://github.com/', '')}</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-neutral-400 hover:text-blue-600 transition-colors">
                              <Plus className="size-3" /> Add GitHub
                            </span>
                          )}

                          {project.live_url ? (
                            <span className="flex items-center gap-1 text-neutral-700 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">
                              <Globe className="size-3" />
                              <span className="truncate max-w-[150px]">Live Link</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-neutral-400 hover:text-blue-600 transition-colors">
                              <Plus className="size-3" /> Add Live Link
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <RichTextEditor
                      value={project.description}
                      onChange={(value) => handleUpdateProject(projectIdx, 'description', value)}
                      placeholder="Project description..."
                      minHeight="80px"
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
                            <div className="flex-1">
                              <RichTextEditor
                                value={bullet}
                                onChange={(value) => handleUpdateBullet(projectIdx, bulletIdx, value)}
                                placeholder="Bullet point..."
                                minHeight="60px"
                              />
                            </div>
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
                <div className="flex-1">
                  <RichTextEditor
                    value={problem}
                    onChange={(value) => {
                      const updated = [...content.problems_solved]
                      updated[idx] = value
                      onContentChange({ ...content, problems_solved: updated })
                    }}
                    placeholder="Achievement..."
                    minHeight="60px"
                  />
                </div>
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