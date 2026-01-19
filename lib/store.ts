import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Basic Clerk user (from existing store)
interface ClerkUser {
  id?: string
  name?: string
  email?: string
  avatar?: string
  worksStatus?: string
}

// Education interface
interface Education {
  degree: string
  school: string
  start_year: number
  end_year: number | null
  gpa: number | null
}

// Work experience interface
interface WorkExperience {
  job_title: string
  company: string
  start_date: string
  end_date: string | null
  description: string
}

// Full user profile (from database)
interface UserProfile {
  _id: string
  clerk_id: string
  github_username: string
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

// Subscription interface
interface Subscription {
  tier: string
  status: string
  generation_attempts_used: number
  generation_attempts_limit: number
  saved_resumes_count: number
  saved_resumes_limit: number
  monthly_resumes_created: number
  monthly_resumes_limit: number
}

// Combined store interface
interface UserStore {
  // Clerk user (basic auth info)
  clerkUser: ClerkUser | null
  setClerkUser: (user: ClerkUser | null) => void

  // Full user profile (from database)
  userProfile: UserProfile | null
  setUserProfile: (profile: UserProfile | null) => void

  // Subscription data
  subscription: Subscription | null
  setSubscription: (subscription: Subscription | null) => void

  // Clear all user data (on logout)
  clearUserData: () => void

  // Loading states
  isProfileLoading: boolean
  setProfileLoading: (loading: boolean) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Clerk user
      clerkUser: null,
      setClerkUser: (user) => set({ clerkUser: user }),

      // User profile
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),

      // Subscription
      subscription: null,
      setSubscription: (subscription) => set({ subscription }),

      // Clear all
      clearUserData: () =>
        set({
          clerkUser: null,
          userProfile: null,
          subscription: null
        }),

      // Loading states
      isProfileLoading: false,
      setProfileLoading: (loading) => set({ isProfileLoading: loading })
    }),
    {
      name: 'user-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields (exclude loading states)
        clerkUser: state.clerkUser,
        userProfile: state.userProfile,
        subscription: state.subscription
      })
    }
  )
)