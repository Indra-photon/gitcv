// Tier Limits and Configuration Constants

// Free Tier Limits
export const FREE_GENERATION_ATTEMPTS_LIMIT = 5;
export const FREE_SAVED_RESUMES_LIMIT = 3;
export const FREE_PDF_EXPIRY_DAYS = 15;
export const FREE_DRAFTS_LIMIT = 3;
export const FREE_DRAFTS_PER_DAY_LIMIT = 5;

// Paid Tier Limits
export const PAID_MONTHLY_RESUMES_LIMIT = 50;
export const PAID_GENERATION_ATTEMPTS_LIMIT = -1; // -1 = unlimited
export const PAID_SAVED_RESUMES_LIMIT = -1; // -1 = unlimited

// AI Configuration
export const AI_FREE_MAX_COST_PER_RESUME = 0.01;
export const AI_PAID_MAX_COST_PER_RESUME = 0.15;
export const AI_FREE_TOKENS_LIMIT = 5000;
export const AI_PAID_TOKENS_LIMIT = 10000;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM_MONTHLY: 'premium_monthly',
  PREMIUM_ANNUAL: 'premium_annual',
  LIFETIME: 'lifetime'
} as const;

// Subscription Status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled'
} as const;

// Resume Status
export const RESUME_STATUS = {
  SAVED: 'saved'
} as const;

// Resume Roles
export const RESUME_ROLES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  FULLSTACK: 'fullstack',
  MOBILE: 'mobile',
  DEVOPS: 'devops'
} as const;

// Template Types
export const TEMPLATE_TYPES = {
  DEFAULT: 'default',
  MODERN: 'modern',
  MINIMAL: 'minimal',
  CREATIVE: 'creative',
  ACADEMIC: 'academic',
  EXECUTIVE: 'executive'
} as const;

// Pricing (in USD cents)
export const PRICING = {
  PREMIUM_MONTHLY: 1000, // $10.00
  PREMIUM_ANNUAL: 5000, // $50.00
  LIFETIME: 4900 // $49.00
} as const;

// Types
export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS];
export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];
export type ResumeStatus = typeof RESUME_STATUS[keyof typeof RESUME_STATUS];
export type ResumeRole = typeof RESUME_ROLES[keyof typeof RESUME_ROLES];
export type TemplateType = typeof TEMPLATE_TYPES[keyof typeof TEMPLATE_TYPES];