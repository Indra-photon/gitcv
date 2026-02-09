'use client'

import { useUser } from '@clerk/nextjs'
import { useUserStore } from '@/lib/store'
import { useEffect, useRef } from 'react'

export function UserSync() {
  const { isSignedIn, user, isLoaded } = useUser()
  const {
    clerkUser,
    setClerkUser,
    userProfile,
    setUserProfile,
    setSubscription,
    clearUserData,
    setProfileLoading
  } = useUserStore()

  // Track last fetched user id to refetch when user changes
  const lastFetchedUserId = useRef<string | null>(null)

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
        lastFetchedUserId.current = null
      }
    }
  }, [isSignedIn, user, isLoaded, setClerkUser, clearUserData])

  // Fetch full profile and subscription
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn || !user) return

      // Check if user's profileComplete status just changed or if we haven't fetched for this user
      const profileComplete = user.publicMetadata?.profileComplete as boolean | undefined
      const needsFetch = lastFetchedUserId.current !== user.id ||
        (profileComplete && !userProfile)

      if (!needsFetch) return

      lastFetchedUserId.current = user.id
      setProfileLoading(true)

      try {
        // Fetch user profile with retry for recently completed profiles
        let profileData = null
        let retries = 0
        const maxRetries = 3

        while (retries < maxRetries) {
          const profileRes = await fetch('/api/user/profile')
          if (profileRes.ok) {
            profileData = await profileRes.json()
            if (profileData.data) {
              setUserProfile(profileData.data)
              break
            }
          }
          // If profile not found but profileComplete is true, wait and retry
          if (profileComplete && retries < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, 500))
            retries++
          } else {
            break
          }
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
  }, [isSignedIn, user, user?.publicMetadata?.profileComplete, userProfile, setUserProfile, setSubscription, setProfileLoading])

  // Reset on logout
  useEffect(() => {
    if (!isSignedIn) {
      lastFetchedUserId.current = null
    }
  }, [isSignedIn])

  return null
}
