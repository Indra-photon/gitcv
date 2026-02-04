import { SubscriptionTier, SUBSCRIPTION_TIERS } from '@/constants/limit'

export const DODO_CONFIG = {
  apiKey: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
} as const

export const DODO_PRODUCT_MAP = {
  premium_monthly: process.env.DODO_PRODUCT_ID_MONTHLY!,
  premium_annual: process.env.DODO_PRODUCT_ID_ANNUAL!,
  lifetime: process.env.DODO_PRODUCT_ID_LIFETIME!
} as const

export function getTierFromProductId(productId: string): SubscriptionTier {
  const entries = Object.entries(DODO_PRODUCT_MAP)
  const found = entries.find(([_, id]) => id === productId)
  return (found?.[0] as SubscriptionTier) || SUBSCRIPTION_TIERS.FREE
}