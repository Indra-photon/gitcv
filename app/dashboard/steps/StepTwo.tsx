'use client'

import { useState, useEffect } from 'react'
import { Search, Star, GitBranch, Calendar, ChevronLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { SubHeading } from '@/components/SubHeading'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { CalSans } from '@/lib/fonts'

interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

interface StepTwoProps {
  githubUsername: string
  selectedRepos: string[]
  setSelectedRepos: (repos: string[]) => void
  onBack: () => void
  onNext: () => void
}

export default function StepTwo({
  githubUsername,
  selectedRepos,
  setSelectedRepos,
  onBack,
  onNext
}: StepTwoProps) {
  const [repos, setRepos] = useState<Repository[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('updated')

  // Fetch repositories
  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        const data = await response.json()
        setRepos(data)
        setFilteredRepos(data)
      } catch (error) {
        console.error('Error fetching repos:', error)
        toast.error('Failed to load repositories. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [githubUsername])

  // Search and filter
  useEffect(() => {
    let filtered = repos

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredRepos(filtered)
  }, [searchQuery, sortBy, repos])

  const handleToggleRepo = (repoUrl: string) => {
    if (selectedRepos.includes(repoUrl)) {
      setSelectedRepos(selectedRepos.filter((url) => url !== repoUrl))
    } else {
      if (selectedRepos.length >= 5) {
        toast.error('You can select a maximum of 5 repositories')
        return
      }
      setSelectedRepos([...selectedRepos, repoUrl])
    }
  }

  const handleContinue = () => {
    if (selectedRepos.length < 3) {
      toast.error('Please select at least 3 repositories')
      return
    }
    onNext()
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const updated = new Date(date)
    const days = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Updated today'
    if (days === 1) return 'Updated yesterday'
    if (days < 30) return `Updated ${days} days ago`
    if (days < 365) return `Updated ${Math.floor(days / 30)} months ago`
    return `Updated ${Math.floor(days / 365)} years ago`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <SubHeading className='text-neutral-600'>Select Repositories</SubHeading>
        <p className={cn("text-sm text-neutral-600", CalSans.className)}>
          Choose 3-5 repositories that best showcase your skills
        </p>
      </div>

      {/* Selection Counter */}
      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <div className="flex items-center gap-2">
          <div className={`size-10 rounded-full flex items-center justify-center font-medium ${
            selectedRepos.length >= 3 && selectedRepos.length <= 5
              ? 'bg-green-100 text-green-700'
              : 'bg-neutral-200 text-neutral-600'
          }`}>
            {selectedRepos.length}
          </div>
          <div>
            <p className={cn("font-medium", selectedRepos.length >=3 && selectedRepos.length <=5 ? "text-green-700" : "text-neutral-900", CalSans.className)}>
              {selectedRepos.length} of 5 selected
            </p>
            <p className={cn("text-xs", CalSans.className)}>
              {selectedRepos.length < 3 && `Select ${3 - selectedRepos.length} more`}
              {selectedRepos.length >= 3 && selectedRepos.length <= 5 && 'Ready to continue'}
              {selectedRepos.length > 5 && 'Maximum reached'}
            </p>
          </div>
        </div>

        {selectedRepos.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedRepos([])}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={sortBy === 'updated' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('updated')}
          >
            Recently Updated
          </Button>
          <Button
            variant={sortBy === 'stars' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('stars')}
          >
            Most Stars
          </Button>
          <Button
            variant={sortBy === 'name' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('name')}
          >
            Name
          </Button>
        </div>
      </div>

      {/* Repository List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <Loader2 className="size-8 animate-spin text-neutral-400 mx-auto" />
              <p className="text-sm text-neutral-600">Loading repositories...</p>
            </div>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-neutral-600">
              {searchQuery ? 'No repositories match your search' : 'No repositories found'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredRepos.map((repo) => {
              const isSelected = selectedRepos.includes(repo.html_url)

              return (
                <Label
                  key={repo.id}
                  htmlFor={`repo-${repo.id}`}
                  className="cursor-pointer block"
                >
                  <div
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`repo-${repo.id}`}
                        checked={isSelected}
                        onCheckedChange={() => handleToggleRepo(repo.html_url)}
                        className="mt-1"
                      />

                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Repo Name & Description */}
                        <div>
                          <p className="font-medium text-neutral-900 truncate">
                            {repo.name}
                          </p>
                          {repo.description && (
                            <p className="text-sm text-neutral-600 line-clamp-2 text-pretty">
                              {repo.description}
                            </p>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                          {repo.language && (
                            <div className="flex items-center gap-1">
                              <div className="size-2 rounded-full bg-neutral-400" />
                              <span>{repo.language}</span>
                            </div>
                          )}

                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="size-3" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                          )}

                          {repo.forks_count > 0 && (
                            <div className="flex items-center gap-1">
                              <GitBranch className="size-3" />
                              <span>{repo.forks_count}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            <span>{getTimeAgo(repo.updated_at)}</span>
                          </div>
                        </div>

                        {/* Topics */}
                        {repo.topics?.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {repo.topics.slice(0, 5).map((topic) => (
                              <Badge key={topic} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Label>
              )
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <Button
          variant="outline"
          onClick={onBack}
        >
          <ChevronLeft className="size-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleContinue}
          disabled={selectedRepos.length < 3 || selectedRepos.length > 5}
          size="lg"
        >
          Generate Resume ({selectedRepos.length}/5)
        </Button>
      </div>
    </div>
  )
}