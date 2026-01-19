'use client'

import { useUser } from '@clerk/nextjs'
import { useUserStore } from '@/lib/store'
import { useEffect, useRef } from 'react'

export function UserSync() {
  const { isSignedIn, user, isLoaded } = useUser()
  const { 
    clerkUser,
    setClerkUser, 
    setUserProfile, 
    setSubscription,
    clearUserData,
    setProfileLoading
  } = useUserStore()

  // Prevent multiple fetches
  const hasFetched = useRef(false)

  // Sync Clerk user
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        setClerkUser({
          id: user.id,
          name: user.firstName ?? undefined,
          email: user.primaryEmailAddress?.emailAddress,
          avatar: user.imageUrl,
          worksStatus: 'web developer'
        })
      } else {
        clearUserData()
      }
    }
  }, [isSignedIn, user, isLoaded, setClerkUser, clearUserData])

  // Fetch full profile and subscription (only once)
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn || !user || hasFetched.current) return

      hasFetched.current = true
      setProfileLoading(true)

      try {
        // Fetch user profile
        const profileRes = await fetch('/api/user/profile')
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setUserProfile(profileData.data)
        }

        // Fetch subscription
        const subRes = await fetch('/api/subscription')
        if (subRes.ok) {
          const subData = await subRes.json()
          setSubscription(subData.data)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setProfileLoading(false)
      }
    }

    fetchUserData()
  }, [isSignedIn, user, setUserProfile, setSubscription, setProfileLoading])

  // Reset fetch flag on logout
  useEffect(() => {
    if (!isSignedIn) {
      hasFetched.current = false
    }
  }, [isSignedIn])

  return null
}