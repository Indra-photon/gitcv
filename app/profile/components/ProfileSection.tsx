'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Paragraph } from '@/components/Paragraph'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Wrench,
  Edit,
  Save,
  X,
  Plus,
  Trash2
} from 'lucide-react'
import localFont from "next/font/local"
import { cn } from '@/lib/utils'

const CalSans = localFont({
  src: [{ path: "../../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
})

interface Education {
  degree: string
  school: string
  start_year: number
  end_year: number | null
  gpa: number | null
}

interface WorkExperience {
  job_title: string
  company: string
  start_date: string
  end_date: string | null
  description: string
}

interface UserData {
  _id: string
  clerk_id: string
  github_username: string,
  full_name: string | null
  phone: string | null
  location: string | null
  portfolio_url: string | null
  linkedin_url: string | null
  professional_headline: string | null
  education: Education[]
  work_experience: WorkExperience[]
  certifications: string[]
  languages: string[]
  custom_skills: string[]
}

interface ProfileSectionProps {
  user: UserData
}

export default function ProfileSection({ user: initialUser }: ProfileSectionProps) {
  const router = useRouter()
  const [user, setUser] = useState(initialUser)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState({
    github_username: user.github_username,
    full_name: user.full_name || '',
    phone: user.phone || '',
    location: user.location || '',
    portfolio_url: user.portfolio_url || '',
    linkedin_url: user.linkedin_url || '',
    professional_headline: user.professional_headline || ''
  })

  // Education Form State
  const [educationForm, setEducationForm] = useState({
    degree: '',
    school: '',
    start_year: '',
    end_year: '',
    gpa: ''
  })
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null)

  // Work Experience State
  const [workForm, setWorkForm] = useState({
    job_title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: ''
  })
  const [editingWorkIndex, setEditingWorkIndex] = useState<number | null>(null)

  // Additional Info State
  const [additionalInfo, setAdditionalInfo] = useState({
    certifications: user.certifications.join(', '),
    languages: user.languages.join(', '),
    custom_skills: user.custom_skills.join(', ')
  })

  const handleSavePersonalInfo = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalInfo)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setUser(prev => ({ ...prev, ...personalInfo }))
      setEditingSection(null)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAdditionalInfo = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/additional', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certifications: additionalInfo.certifications.split(',').map(s => s.trim()).filter(Boolean),
          languages: additionalInfo.languages.split(',').map(s => s.trim()).filter(Boolean),
          custom_skills: additionalInfo.custom_skills.split(',').map(s => s.trim()).filter(Boolean)
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update additional information')
      }

      setUser(prev => ({
        ...prev,
        certifications: data.data.certifications,
        languages: data.data.languages,
        custom_skills: data.data.custom_skills
      }))
      setEditingSection(null)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEducation = async (index: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/education', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          education: { index }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete education')
      }

      setUser(prev => ({ ...prev, education: data.data }))
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteWorkExperience = async (index: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/work-experience', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          work_experience: { index }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete work experience')
      }

      setUser(prev => ({ ...prev, work_experience: data.data }))
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveEducation = async () => {
    setLoading(true)
    setError(null)

    try {
      const action = editingEducationIndex !== null ? 'update' : 'add'
      const education = {
        ...(editingEducationIndex !== null && { index: editingEducationIndex }),
        degree: educationForm.degree,
        school: educationForm.school,
        start_year: parseInt(educationForm.start_year),
        end_year: educationForm.end_year ? parseInt(educationForm.end_year) : null,
        gpa: educationForm.gpa ? parseFloat(educationForm.gpa) : null
      }

      const response = await fetch('/api/user/education', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, education })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save education')
      }

      setUser(prev => ({ ...prev, education: data.data }))
      setEditingSection(null)
      setEditingEducationIndex(null)
      setEducationForm({ degree: '', school: '', start_year: '', end_year: '', gpa: '' })
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEditEducation = (index: number) => {
    const edu = user.education[index]
    setEducationForm({
      degree: edu.degree,
      school: edu.school,
      start_year: edu.start_year.toString(),
      end_year: edu.end_year ? edu.end_year.toString() : '',
      gpa: edu.gpa ? edu.gpa.toString() : ''
    })
    setEditingEducationIndex(index)
    setEditingSection('education')
  }

  const handleSaveWorkExperience = async () => {
    setLoading(true)
    setError(null)

    try {
      const action = editingWorkIndex !== null ? 'update' : 'add'
      const work_experience = {
        ...(editingWorkIndex !== null && { index: editingWorkIndex }),
        job_title: workForm.job_title,
        company: workForm.company,
        start_date: workForm.start_date,
        end_date: workForm.end_date || null,
        description: workForm.description
      }

      const response = await fetch('/api/user/work-experience', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, work_experience })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save work experience')
      }

      setUser(prev => ({ ...prev, work_experience: data.data }))
      setEditingSection(null)
      setEditingWorkIndex(null)
      setWorkForm({ job_title: '', company: '', start_date: '', end_date: '', description: '' })
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEditWorkExperience = (index: number) => {
    const exp = user.work_experience[index]
    setWorkForm({
      job_title: exp.job_title,
      company: exp.company,
      start_date: exp.start_date.split('T')[0],
      end_date: exp.end_date ? exp.end_date.split('T')[0] : '',
      description: exp.description
    })
    setEditingWorkIndex(index)
    setEditingSection('work')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Personal Information Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-neutral-900">
            <Paragraph className='text-neutral-900'>Personal Information</Paragraph>
          </CardTitle>
          {editingSection !== 'personal' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingSection('personal')}
              className="text-neutral-700 border-neutral-300"
            >
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingSection(null)
                  setPersonalInfo({
                    github_username: user.github_username,
                    full_name: user.full_name || '',
                    phone: user.phone || '',
                    location: user.location || '',
                    portfolio_url: user.portfolio_url || '',
                    linkedin_url: user.linkedin_url || '',
                    professional_headline: user.professional_headline || ''
                  })
                }}
                disabled={loading}
                className="text-neutral-700 border-neutral-300"
              >
                <X className="size-4 mr-2" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSavePersonalInfo}
                disabled={loading}
                className="bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                <Save className="size-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {editingSection === 'personal' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className={cn("text-neutral-700", CalSans.className)}>
                    Full Name *
                  </Label>
                  <Input
                    id="full_name"
                    value={personalInfo.full_name}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="John Doe"
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github_username" className={cn("text-neutral-700", CalSans.className)}>GitHub Username</Label>
                  <Input
                    id="github_username"
                    value={personalInfo.github_username}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, github_username: e.target.value }))}
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className={cn("text-neutral-700", CalSans.className)}>Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className={cn("text-neutral-700", CalSans.className)}>Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio_url" className={cn("text-neutral-700", CalSans.className)}>Portfolio URL</Label>
                  <Input
                    id="portfolio_url"
                    type="url"
                    value={personalInfo.portfolio_url}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, portfolio_url: e.target.value }))}
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url" className={cn("text-neutral-700", CalSans.className)}>LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={personalInfo.linkedin_url}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, linkedin_url: e.target.value }))}
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="professional_headline" className={cn("text-neutral-700", CalSans.className)}>Professional Headline</Label>
                  <Input
                    id="professional_headline"
                    value={personalInfo.professional_headline}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, professional_headline: e.target.value }))}
                    className="bg-white border-neutral-300"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                  <User className="size-5 text-neutral-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className={cn("text-sm text-neutral-500", CalSans.className)}>GitHub Username</p>
                  <p className={cn("text-base text-neutral-900", CalSans.className)}>{user.github_username}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                  <User className="size-5 text-neutral-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className={cn("text-sm text-neutral-500", CalSans.className)}>Full Name</p>
                  <p className={cn("text-base text-neutral-900", CalSans.className)}>{user.full_name || 'N/A'}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                    <Phone className="size-5 text-neutral-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm text-neutral-500", CalSans.className)}>Phone</p>
                    <p className={cn("text-base text-neutral-900", CalSans.className)}>{user.phone}</p>
                  </div>
                </div>
              )}

              {user.location && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                    <MapPin className="size-5 text-neutral-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm text-neutral-500", CalSans.className)}>Location</p>
                    <p className={cn("text-base text-neutral-900", CalSans.className)}>{user.location}</p>
                  </div>
                </div>
              )}

              {user.portfolio_url && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                    <Globe className="size-5 text-neutral-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm text-neutral-500", CalSans.className)}>Portfolio</p>
                    <a 
                      href={user.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("text-base text-blue-600 hover:text-blue-700 truncate block", CalSans.className)}
                    >
                      {user.portfolio_url}
                    </a>
                  </div>
                </div>
              )}

              {user.linkedin_url && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                    <Linkedin className="size-5 text-neutral-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm text-neutral-500", CalSans.className)}>LinkedIn</p>
                    <a 
                      href={user.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("text-base text-blue-600 hover:text-blue-700 truncate block", CalSans.className)}
                    >
                      {user.linkedin_url}
                    </a>
                  </div>
                </div>
              )}

              {user.professional_headline && (
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                    <Briefcase className="size-5 text-neutral-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm text-neutral-500", CalSans.className)}>Professional Headline</p>
                    <p className={cn("text-base text-neutral-900", CalSans.className)}>{user.professional_headline}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
            <GraduationCap className="size-5" />
            <Paragraph className='text-neutral-900'>Education</Paragraph>
          </CardTitle>
          {editingSection !== 'education' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEducationForm({ degree: '', school: '', start_year: '', end_year: '', gpa: '' })
                setEditingEducationIndex(null)
                setEditingSection('education')
              }}
              className="text-neutral-700 border-neutral-300"
            >
              <Plus className="size-4 mr-2" />
              Add Education
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {editingSection === 'education' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree" className={cn("text-neutral-700", CalSans.className)}>Degree *</Label>
                  <Input
                    id="degree"
                    value={educationForm.degree}
                    onChange={(e) => setEducationForm(prev => ({ ...prev, degree: e.target.value }))}
                    placeholder="B.S. Computer Science"
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school" className={cn("text-neutral-700", CalSans.className)}>School *</Label>
                  <Input
                    id="school"
                    value={educationForm.school}
                    onChange={(e) => setEducationForm(prev => ({ ...prev, school: e.target.value }))}
                    placeholder="University of California"
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start_year" className={cn("text-neutral-700", CalSans.className)}>Start Year *</Label>
                  <Input
                    id="start_year"
                    type="number"
                    value={educationForm.start_year}
                    onChange={(e) => setEducationForm(prev => ({ ...prev, start_year: e.target.value }))}
                    placeholder="2020"
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_year" className={cn("text-neutral-700", CalSans.className)}>End Year</Label>
                  <Input
                    id="end_year"
                    type="number"
                    value={educationForm.end_year}
                    onChange={(e) => setEducationForm(prev => ({ ...prev, end_year: e.target.value }))}
                    placeholder="2024 (leave blank if current)"
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpa" className={cn("text-neutral-700", CalSans.className)}>GPA</Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.01"
                    value={educationForm.gpa}
                    onChange={(e) => setEducationForm(prev => ({ ...prev, gpa: e.target.value }))}
                    placeholder="3.8"
                    className="bg-white border-neutral-300"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingSection(null)
                    setEditingEducationIndex(null)
                    setEducationForm({ degree: '', school: '', start_year: '', end_year: '', gpa: '' })
                  }}
                  disabled={loading}
                  className="text-neutral-700 border-neutral-300"
                >
                  <X className="size-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEducation}
                  disabled={loading || !educationForm.degree || !educationForm.school || !educationForm.start_year}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  <Save className="size-4 mr-2" />
                  {loading ? 'Saving...' : (editingEducationIndex !== null ? 'Update' : 'Add')}
                </Button>
              </div>
            </div>
          ) : (
            <>
              {user.education.length > 0 ? (
                <div className="space-y-4">
                  {user.education.map((edu, index) => (
                    <div key={index}>
                      {index > 0 && <Separator className="my-4 bg-neutral-200" />}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <p className={cn("text-base font-semibold text-neutral-900", CalSans.className)}>{edu.degree}</p>
                          <p className={cn("text-sm text-neutral-600", CalSans.className)}>{edu.school}</p>
                          <div className={cn("flex items-center gap-4 text-sm text-neutral-500", CalSans.className)}>
                            <span>{edu.start_year} - {edu.end_year || 'Present'}</span>
                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditEducation(index)}
                            disabled={loading}
                            className="text-neutral-700 border-neutral-300"
                            aria-label="Edit education"
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEducation(index)}
                            disabled={loading}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            aria-label="Delete education"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>No education added yet</p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Work Experience Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
            <Briefcase className="size-5" />
            <Paragraph className='text-neutral-900'>Work Experience</Paragraph>
          </CardTitle>
          {editingSection !== 'work' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setWorkForm({ job_title: '', company: '', start_date: '', end_date: '', description: '' })
                setEditingWorkIndex(null)
                setEditingSection('work')
              }}
              className="text-neutral-700 border-neutral-300"
            >
              <Plus className="size-4 mr-2" />
              Add Experience
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {editingSection === 'work' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job_title" className={cn("text-neutral-700", CalSans.className)}>Job Title *</Label>
                  <Input
                    id="job_title"
                    value={workForm.job_title}
                    onChange={(e) => setWorkForm(prev => ({ ...prev, job_title: e.target.value }))}
                    placeholder="Software Engineer"
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className={cn("text-neutral-700", CalSans.className)}>Company *</Label>
                  <Input
                    id="company"
                    value={workForm.company}
                    onChange={(e) => setWorkForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Tech Corp"
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start_date" className={cn("text-neutral-700", CalSans.className)}>Start Date *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={workForm.start_date}
                    onChange={(e) => setWorkForm(prev => ({ ...prev, start_date: e.target.value }))}
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date" className={cn("text-neutral-700", CalSans.className)}>End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={workForm.end_date}
                    onChange={(e) => setWorkForm(prev => ({ ...prev, end_date: e.target.value }))}
                    placeholder="Leave blank if current"
                    className="bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className={cn("text-neutral-700", CalSans.className)}>Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={workForm.description}
                    onChange={(e) => setWorkForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your responsibilities and achievements..."
                    className="bg-white border-neutral-300 text-pretty"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingSection(null)
                    setEditingWorkIndex(null)
                    setWorkForm({ job_title: '', company: '', start_date: '', end_date: '', description: '' })
                  }}
                  disabled={loading}
                  className="text-neutral-700 border-neutral-300"
                >
                  <X className="size-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveWorkExperience}
                  disabled={loading || !workForm.job_title || !workForm.company || !workForm.start_date || !workForm.description}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  <Save className="size-4 mr-2" />
                  {loading ? 'Saving...' : (editingWorkIndex !== null ? 'Update' : 'Add')}
                </Button>
              </div>
            </div>
          ) : (
            <>
              {user.work_experience.length > 0 ? (
                <div className="space-y-4">
                  {user.work_experience.map((exp, index) => (
                    <div key={index}>
                      {index > 0 && <Separator className="my-4 bg-neutral-200" />}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <p className={cn("text-base font-semibold text-neutral-900", CalSans.className)}>{exp.job_title}</p>
                          <p className={cn("text-sm font-medium text-neutral-700", CalSans.className)}>{exp.company}</p>
                          <p className={cn("text-sm text-neutral-500", CalSans.className)}>
                            {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                          </p>
                          <p className={cn("text-sm text-neutral-600 text-pretty", CalSans.className)}>{exp.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditWorkExperience(index)}
                            disabled={loading}
                            className="text-neutral-700 border-neutral-300"
                            aria-label="Edit work experience"
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteWorkExperience(index)}
                            disabled={loading}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            aria-label="Delete work experience"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>No work experience added yet</p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Additional Information Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-neutral-900">
            <Paragraph className='text-neutral-900'>Additional Information</Paragraph>
          </CardTitle>
          {editingSection !== 'additional' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingSection('additional')}
              className="text-neutral-700 border-neutral-300"
            >
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingSection(null)
                  setAdditionalInfo({
                    certifications: user.certifications.join(', '),
                    languages: user.languages.join(', '),
                    custom_skills: user.custom_skills.join(', ')
                  })
                }}
                disabled={loading}
                className="text-neutral-700 border-neutral-300"
              >
                <X className="size-4 mr-2" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveAdditionalInfo}
                disabled={loading}
                className="bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                <Save className="size-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {editingSection === 'additional' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certifications" className={cn("text-neutral-700", CalSans.className)}>
                  Certifications (comma-separated)
                </Label>
                <Input
                  id="certifications"
                  value={additionalInfo.certifications}
                  onChange={(e) => setAdditionalInfo(prev => ({ ...prev, certifications: e.target.value }))}
                  placeholder="AWS Certified, Google Cloud Professional"
                  className="bg-white border-neutral-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages" className={cn("text-neutral-700", CalSans.className)}>
                  Languages (comma-separated)
                </Label>
                <Input
                  id="languages"
                  value={additionalInfo.languages}
                  onChange={(e) => setAdditionalInfo(prev => ({ ...prev, languages: e.target.value }))}
                  placeholder="English, Spanish, French"
                  className="bg-white border-neutral-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom_skills" className={cn("text-neutral-700", CalSans.className)}>
                  Additional Skills (comma-separated)
                </Label>
                <Input
                  id="custom_skills"
                  value={additionalInfo.custom_skills}
                  onChange={(e) => setAdditionalInfo(prev => ({ ...prev, custom_skills: e.target.value }))}
                  placeholder="Public Speaking, Team Leadership"
                  className="bg-white border-neutral-300"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className={cn("flex items-center gap-2 text-base font-medium text-neutral-900", CalSans.className)}>
                  <Award className="size-5" />
                  Certifications
                </div>
                {user.certifications.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className={cn("text-sm text-neutral-500", CalSans.className)}>None added</p>
                )}
              </div>

              <div className="space-y-3">
                <div className={cn("flex items-center gap-2 text-base font-medium text-neutral-900", CalSans.className)}>
                  <Languages className="size-5" />
                  Languages
                </div>
                {user.languages.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.languages.map((lang, index) => (
                      <Badge key={index} variant="secondary" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className={cn("text-sm text-neutral-500", CalSans.className)}>None added</p>
                )}
              </div>

              <div className="space-y-3">
                <div className={cn("flex items-center gap-2 text-base font-medium text-neutral-900", CalSans.className)}>
                  <Wrench className="size-5" />
                  Additional Skills
                </div>
                {user.custom_skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.custom_skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className={cn("text-sm text-neutral-500", CalSans.className)}>None added</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}