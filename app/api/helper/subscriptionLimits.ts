/**
 * Subscription Limit Utilities
 * Helper functions to check and enforce subscription limits
 */

import { ISubscription } from '@/app/api/models/subscriptionModel'
import { SUBSCRIPTION_TIERS } from '@/constants/limit'

export interface LimitCheckResult {
  allowed: boolean
  reason?: string
  limits?: {
    used: number
    limit: number
    remaining: number
  }
}

/**
 * Check if user can generate a new resume
 */
export function canGenerateResume(
  subscription: ISubscription,
  savedResumesCount: number
): LimitCheckResult {
  const isFree = subscription.tier === SUBSCRIPTION_TIERS.FREE

  if (isFree) {
    // Check generation attempts limit
    const attemptsRemaining =
      subscription.generation_attempts_limit - subscription.generation_attempts_used

    if (attemptsRemaining <= 0) {
      return {
        allowed: false,
        reason: `You've reached your free tier limit of ${subscription.generation_attempts_limit} generation attempts. Upgrade to Premium for unlimited generations.`,
        limits: {
          used: subscription.generation_attempts_used,
          limit: subscription.generation_attempts_limit,
          remaining: 0
        }
      }
    }

    // Check saved resumes limit
    if (savedResumesCount >= subscription.saved_resumes_limit) {
      return {
        allowed: false,
        reason: `You've reached your free tier limit of ${subscription.saved_resumes_limit} saved resumes. Upgrade to Premium for unlimited resumes.`,
        limits: {
          used: savedResumesCount,
          limit: subscription.saved_resumes_limit,
          remaining: 0
        }
      }
    }

    return {
      allowed: true,
      limits: {
        used: subscription.generation_attempts_used,
        limit: subscription.generation_attempts_limit,
        remaining: attemptsRemaining
      }
    }
  } else {
    // Paid tier - check monthly limit
    const monthlyRemaining =
      subscription.monthly_resumes_limit - subscription.monthly_resumes_created

    if (subscription.monthly_resumes_limit !== -1 && monthlyRemaining <= 0) {
      return {
        allowed: false,
        reason: `You've reached your monthly limit of ${subscription.monthly_resumes_limit} resumes. Limit resets at the start of next billing period.`,
        limits: {
          used: subscription.monthly_resumes_created,
          limit: subscription.monthly_resumes_limit,
          remaining: 0
        }
      }
    }

    return {
      allowed: true,
      limits: {
        used: subscription.monthly_resumes_created,
        limit: subscription.monthly_resumes_limit,
        remaining: monthlyRemaining > 0 ? monthlyRemaining : -1 // -1 = unlimited
      }
    }
  }
}

/**
 * Check if user can use job description feature
 */
export function canUseJobDescription(subscription: ISubscription): boolean {
  return subscription.tier !== SUBSCRIPTION_TIERS.FREE
}

/**
 * Get PDF expiry date based on subscription tier
 */
export function getPdfExpiryDate(subscription: ISubscription): Date | null {
  const isFree = subscription.tier === SUBSCRIPTION_TIERS.FREE

  if (isFree) {
    // Free tier: 15 days from now
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 15)
    return expiryDate
  }

  // Paid tier: never expires
  return null
}

/**
 * Check if user is on paid tier
 */
export function isPaidTier(subscription: ISubscription): boolean {
  return subscription.tier !== SUBSCRIPTION_TIERS.FREE
}

/**
 * Get AI cost limit based on subscription tier
 */
export function getAICostLimit(subscription: ISubscription): number {
  const isFree = subscription.tier === SUBSCRIPTION_TIERS.FREE
  return isFree ? 0.01 : 0.15 // Free: $0.01, Paid: $0.15
}

/**
 * Calculate estimated AI cost (basic estimation)
 * This is a rough estimate - actual cost is calculated after AI call
 */
export function estimateAICost(tokensUsed: number): number {
  // Rough estimate: $0.001 per 1000 tokens
  return (tokensUsed / 1000) * 0.001
}