'use client'

import React, { useState } from 'react'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'
import { Button } from '@/components/ui/button'
import ProfileSection from './ProfileSection'
import GeneratedResumeSection from './GeneratedResumeSection'
import SubscriptionSection from './SubscriptionSection'
import { 
  User, 
  FileText, 
  CreditCard,
  Menu,
  X
} from 'lucide-react'
import localFont from "next/font/local"
import { cn } from '@/lib/utils'

const CalSans = localFont({
  src: [{ path: "../../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
})

interface UserData {
  _id: string
  clerk_id: string
  github_username: string
  full_name: string | null
  phone: string | null
  location: string | null
  portfolio_url: string | null
  linkedin_url: string | null
  professional_headline: string | null
  education: any[]
  work_experience: any[]
  certifications: string[]
  languages: string[]
  custom_skills: string[]
}

interface ProfileLayoutProps {
  user: UserData
}

type Section = 'profile' | 'resumes' | 'subscription'

const navigationItems = [
  { id: 'profile' as Section, label: 'Profile', icon: User },
  { id: 'resumes' as Section, label: 'Generated Resumes', icon: FileText },
  { id: 'subscription' as Section, label: 'Subscription', icon: CreditCard },
]

export default function ProfileLayout({ user }: ProfileLayoutProps) {
  const [activeSection, setActiveSection] = useState<Section>('profile')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection user={user} />
      case 'resumes':
        return <GeneratedResumeSection />
      case 'subscription':
        return <SubscriptionSection />
      default:
        return <ProfileSection user={user} />
    }
  }

  const handleNavigationClick = (section: Section) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between">
            <Heading className="text-3xl font-semibold text-neutral-900 text-balance">
              Account Settings
            </Heading>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-neutral-700 border-neutral-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
          <Paragraph className="text-neutral-600 text-pretty">
            Manage your profile, resumes, and subscription
          </Paragraph>
        </div>

        {/* Layout Container */}
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigationClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                        isActive
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-700 hover:bg-neutral-100"
                      )}
                    >
                      <Icon className="size-5" />
                      <span className={cn("text-sm font-medium", CalSans.className)}>
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mb-6">
              <nav className="space-y-1 p-4 bg-white border border-neutral-200 rounded-lg">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigationClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                        isActive
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-700 hover:bg-neutral-100"
                      )}
                    >
                      <Icon className="size-5" />
                      <span className={cn("text-sm font-medium", CalSans.className)}>
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Main Content */}
          <main className="min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </Container>
  )
}