'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Paragraph } from '@/components/Paragraph'
import { Progress } from '@/components/ui/progress'
import { 
  CreditCard,
  Check,
  X,
  Zap,
  Calendar,
  TrendingUp,
  AlertCircle,
  Loader2,
  Crown,
  Sparkles
} from 'lucide-react'
import localFont from "next/font/local"
import { cn } from '@/lib/utils'

const CalSans = localFont({
  src: [{ path: "../../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
})

interface SubscriptionData {
  tier: string
  status: string
  is_premium: boolean
  features: {
    job_description_upload: boolean
    pdf_expiration: string
  }
  limits?: {
    generation_attempts?: {
      used: number
      limit: number
      remaining: number
    }
    saved_resumes?: {
      current: number
      limit: number
      remaining: number
    }
    monthly_resumes?: {
      created: number
      limit: number
      remaining: number
    }
    billing_period?: {
      start: string
      end: string
    }
  }
}

export default function SubscriptionSection() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/subscription')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch subscription')
      }

      setSubscription(data.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getTierBadge = (tier: string) => {
    const badges: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      free: {
        label: 'Free',
        className: 'bg-neutral-100 text-neutral-700',
        icon: null
      },
      premium_monthly: {
        label: 'Premium Monthly',
        className: 'bg-blue-100 text-blue-700',
        icon: <Crown className="size-3" />
      },
      premium_annual: {
        label: 'Premium Annual',
        className: 'bg-purple-100 text-purple-700',
        icon: <Crown className="size-3" />
      },
      lifetime: {
        label: 'Lifetime',
        className: 'bg-yellow-100 text-yellow-700',
        icon: <Sparkles className="size-3" />
      }
    }

    const badge = badges[tier.toLowerCase()] || badges.free

    return (
      <Badge className={cn("flex items-center gap-1", badge.className)}>
        {badge.icon}
        {badge.label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="size-8 animate-spin text-neutral-400" />
      </div>
    )
  }

  if (error || !subscription) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-red-600 mt-0.5" />
          <div>
            <p className={cn("text-sm font-medium text-red-900", CalSans.className)}>Error loading subscription</p>
            <p className="text-sm text-red-700">{error || 'Unknown error occurred'}</p>
          </div>
        </div>
      </div>
    )
  }

  const isFree = !subscription.is_premium

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-neutral-900">
            <Paragraph className='text-neutral-900'>Current Plan</Paragraph>
          </CardTitle>
          {getTierBadge(subscription.tier)}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                <CreditCard className="size-5 text-neutral-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>Status</p>
                <Badge 
                  className={cn(
                    "capitalize",
                    subscription.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  )}
                >
                  {subscription.status}
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                <Zap className="size-5 text-neutral-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>PDF Storage</p>
                <p className={cn("text-base text-neutral-900", CalSans.className)}>
                  {subscription.features.pdf_expiration}
                </p>
              </div>
            </div>
          </div>

          {isFree && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="size-5 text-blue-600 mt-0.5" />
                <div>
                  <p className={cn("text-sm font-medium text-blue-900", CalSans.className)}>
                    Upgrade to Premium
                  </p>
                  <p className={cn("text-sm text-blue-700 mt-1", CalSans.className)}>
                    Unlock unlimited resumes, job description analysis, and more
                  </p>
                  <Button 
                    size="sm" 
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View Plans
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Limits Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-neutral-900">
            <Paragraph className='text-neutral-900'>Usage & Limits</Paragraph>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isFree && subscription.limits?.generation_attempts && subscription.limits?.saved_resumes && (
            <>
              {/* Generation Attempts */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className={cn("text-sm font-medium text-neutral-700", CalSans.className)}>
                    Generation Attempts
                  </p>
                  <p className={cn("text-sm text-neutral-500", CalSans.className)}>
                    {subscription.limits.generation_attempts.used} / {subscription.limits.generation_attempts.limit}
                  </p>
                </div>
                <Progress 
                  value={(subscription.limits.generation_attempts.used / subscription.limits.generation_attempts.limit) * 100}
                  className="h-2"
                />
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>
                  {subscription.limits.generation_attempts.remaining} attempts remaining
                </p>
              </div>

              {/* Saved Resumes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className={cn("text-sm font-medium text-neutral-700", CalSans.className)}>
                    Saved Resumes
                  </p>
                  <p className={cn("text-sm text-neutral-500", CalSans.className)}>
                    {subscription.limits.saved_resumes.current} / {subscription.limits.saved_resumes.limit}
                  </p>
                </div>
                <Progress 
                  value={(subscription.limits.saved_resumes.current / subscription.limits.saved_resumes.limit) * 100}
                  className="h-2"
                />
                <p className={cn("text-sm text-neutral-500", CalSans.className)}>
                  {subscription.limits.saved_resumes.remaining} slots available
                </p>
              </div>
            </>
          )}

          {!isFree && subscription.limits?.monthly_resumes && (
            <>
              {/* Monthly Resumes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className={cn("text-sm font-medium text-neutral-700", CalSans.className)}>
                    Monthly Resumes
                  </p>
                  <p className={cn("text-sm text-neutral-500", CalSans.className)}>
                    {subscription.limits.monthly_resumes.created} / {
                      subscription.limits.monthly_resumes.limit === -1 
                        ? '∞' 
                        : subscription.limits.monthly_resumes.limit
                    }
                  </p>
                </div>
                {subscription.limits.monthly_resumes.limit !== -1 && (
                  <Progress 
                    value={(subscription.limits.monthly_resumes.created / subscription.limits.monthly_resumes.limit) * 100}
                    className="h-2"
                  />
                )}
              </div>

              {/* Billing Period */}
              {subscription.limits.billing_period && (
                <div className="flex items-start gap-3 pt-4 border-t border-neutral-200">
                  <div className="mt-1 p-2 rounded-lg bg-neutral-100">
                    <Calendar className="size-5 text-neutral-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm text-neutral-500", CalSans.className)}>Current Billing Period</p>
                    <p className={cn("text-sm text-neutral-900", CalSans.className)}>
                      {formatDate(subscription.limits.billing_period.start)} - {formatDate(subscription.limits.billing_period.end)}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-neutral-900">
            <Paragraph className='text-neutral-900'>Plan Features</Paragraph>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <FeatureItem 
              enabled={subscription.features.job_description_upload}
              text="Job Description Upload & Analysis"
            />
            <FeatureItem 
              enabled={!isFree}
              text="Unlimited Resume Editing"
            />
            <FeatureItem 
              enabled={!isFree}
              text="Permanent PDF Storage"
            />
            <FeatureItem 
              enabled={!isFree}
              text="Premium Templates"
            />
            <FeatureItem 
              enabled={!isFree}
              text="Priority AI Queue"
            />
            <FeatureItem 
              enabled={!isFree}
              text="Advanced AI Quality"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FeatureItem({ enabled, text }: { enabled: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        "flex items-center justify-center size-5 rounded-full",
        enabled ? "bg-green-100" : "bg-neutral-100"
      )}>
        {enabled ? (
          <Check className="size-3 text-green-600" />
        ) : (
          <X className="size-3 text-neutral-400" />
        )}
      </div>
      <p className={cn(
        "text-sm",
        enabled ? "text-neutral-900" : "text-neutral-400",
        CalSans.className
      )}>
        {text}
      </p>
    </div>
  )
}