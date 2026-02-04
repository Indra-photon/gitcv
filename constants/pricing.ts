import {
  SUBSCRIPTION_TIERS,
  PRICING,
  FREE_GENERATION_ATTEMPTS_LIMIT,
  FREE_SAVED_RESUMES_LIMIT,
  FREE_PDF_EXPIRY_DAYS,
} from './limit';

// Pricing Card Types
export interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
}

export interface PricingCard {
  id: string;
  tier: typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS];
  name: string;
  tagline: string;
  price: number; // in cents
  displayPrice: string;
  billingCycle: 'forever' | 'month' | 'year' | 'once';
  savings?: string;
  badge?: {
    text: string;
    variant: 'default' | 'popular' | 'limited' | 'best-value';
  };
  features: PricingFeature[];
  cta: {
    text: string;
    variant: 'default' | 'primary' | 'premium';
  };
  limitations?: string[];
  targetAudience: string[];
  valueProposition: string;
  highlighted?: boolean;
}

// Pricing Cards Data
export const PRICING_CARDS: PricingCard[] = [
  {
    id: 'free',
    tier: SUBSCRIPTION_TIERS.FREE,
    name: 'Free',
    tagline: 'Get started with AI-powered resumes',
    price: 0,
    displayPrice: '$0',
    billingCycle: 'forever',
    features: [
      {
        text: `${FREE_SAVED_RESUMES_LIMIT} Resume Slots`,
        included: true,
        tooltip: 'Create up to 3 resumes, locked after saving'
      },
      {
        text: 'Standard AI Bullet Generation',
        included: true,
        tooltip: 'Good quality AI-generated content (80-85% quality)'
      },
      {
        text: '1 ATS-Friendly Template',
        included: true
      },
      // {
      //   text: `PDF Storage: ${FREE_PDF_EXPIRY_DAYS} Days`,
      //   included: true,
      //   tooltip: 'PDFs are automatically deleted after 15 days'
      // },
      {
        text: 'GitHub Profile Integration',
        included: true
      },
      {
        text: 'Basic Customization',
        included: true
      },
      {
        text: 'Job Description Upload',
        included: false
      },
      {
        text: 'Edit After Save',
        included: false
      },
      {
        text: 'Delete Resumes',
        included: false
      },
      {
        text: 'Keyword Gap Analysis',
        included: false
      },
      {
        text: 'Premium Templates',
        included: false
      },
      {
        text: 'Version History',
        included: false
      },
      {
        text: 'Markdown Export',
        included: false
      }
    ],
    cta: {
      text: 'Get Started Free',
      variant: 'default'
    },
    targetAudience: [
      'Students exploring the product',
      'Developers building initial portfolio',
      'Users testing before commitment'
    ],
    valueProposition: 'Get a taste of AI-powered resume generation without any commitment.'
  },
  {
    id: 'premium-monthly',
    tier: SUBSCRIPTION_TIERS.PREMIUM_MONTHLY,
    name: 'Premium Monthly',
    tagline: 'Unlimited resumes for active job seekers',
    price: PRICING.PREMIUM_MONTHLY,
    displayPrice: `$${(PRICING.PREMIUM_MONTHLY / 100)}`,
    billingCycle: 'month',
    badge: {
      text: 'Most Popular',
      variant: 'popular'
    },
    features: [
      {
        text: 'Unlimited Resume Slots',
        included: true,
        highlight: true
      },
      {
        text: 'Advanced AI Bullet Generation',
        included: true,
        highlight: true,
        tooltip: 'Excellent quality AI content (100% quality)'
      },
      {
        text: '5 Premium Templates',
        included: true
      },
      // {
      //   text: 'Permanent PDF Storage',
      //   included: true,
      //   highlight: true
      // },
      {
        text: 'Edit Anytime',
        included: true
      },
      {
        text: 'Delete & Recreate Resumes',
        included: true
      },
      {
        text: 'Job Description Upload & Analysis',
        included: true,
        highlight: true
      },
      {
        text: 'AI Role Detection',
        included: true
      },
      {
        text: 'Keyword Gap Analysis',
        included: true,
        highlight: true
      },
      {
        text: 'Unlimited Bullet Regeneration',
        included: true
      },
      {
        text: 'Priority PDF Generation',
        included: true
      },
      {
        text: '10 Version History',
        included: true
      },
      {
        text: 'Markdown Export',
        included: true
      },
      {
        text: '3 Font Choices',
        included: true
      },
      {
        text: '5 Color Schemes',
        included: true
      }
    ],
    cta: {
      text: 'Start Premium',
      variant: 'primary'
    },
    targetAudience: [
      'Active job seekers',
      'Developers needing multiple tailored resumes',
      'Users requiring frequent updates'
    ],
    valueProposition: 'Unlimited resumes with advanced AI for serious job hunting.',
    highlighted: true
  },
  {
    id: 'premium-annual',
    tier: SUBSCRIPTION_TIERS.PREMIUM_ANNUAL,
    name: 'Premium Annual',
    tagline: 'Best value for continuous career growth',
    price: PRICING.PREMIUM_ANNUAL,
    displayPrice: `$${(PRICING.PREMIUM_ANNUAL / 100)}`,
    billingCycle: 'year',
    savings: '$70 (58% off)',
    badge: {
      text: 'Best Value',
      variant: 'best-value'
    },
    features: [
      {
        text: 'Everything in Premium Monthly',
        included: true,
        highlight: true
      },
      {
        text: 'Unlimited Resume Slots',
        included: true
      },
      {
        text: 'Advanced AI Bullet Generation',
        included: true
      },
      {
        text: '5 Premium Templates',
        included: true
      },
      // {
      //   text: 'Permanent PDF Storage',
      //   included: true
      // },
      {
        text: 'Edit Anytime',
        included: true
      },
      {
        text: 'Delete & Recreate Resumes',
        included: true
      },
      {
        text: 'Job Description Upload & Analysis',
        included: true
      },
      {
        text: 'AI Role Detection',
        included: true
      },
      {
        text: 'Keyword Gap Analysis',
        included: true
      },
      {
        text: 'Unlimited Bullet Regeneration',
        included: true
      },
      {
        text: 'Priority PDF Generation',
        included: true
      },
      {
        text: '10 Version History',
        included: true
      },
      {
        text: 'Markdown Export',
        included: true
      },
      {
        text: '3 Font Choices',
        included: true
      },
      {
        text: '5 Color Schemes',
        included: true
      },
      {
        text: 'Save $70 Annually',
        included: true,
        highlight: true
      }
    ],
    cta: {
      text: 'Get Annual Plan',
      variant: 'premium'
    },
    targetAudience: [
      'Long-term career builders',
      'Users committed to the platform',
      'Budget-conscious professionals'
    ],
    valueProposition: 'Best value for continuous career development.',
    highlighted: false
  },
  {
    id: 'lifetime',
    tier: SUBSCRIPTION_TIERS.LIFETIME,
    name: 'Lifetime Deal',
    tagline: 'Pay once, use forever',
    price: PRICING.LIFETIME,
    displayPrice: `$${(PRICING.LIFETIME / 100)}`,
    billingCycle: 'once',
    badge: {
      text: 'Limited: 500 Left',
      variant: 'limited'
    },
    features: [
      {
        text: 'Everything in Premium',
        included: true,
        highlight: true
      },
      {
        text: 'Unlimited Resume Slots',
        included: true
      },
      {
        text: 'Advanced AI Bullet Generation',
        included: true
      },
      {
        text: '5 Premium Templates',
        included: true
      },
      {
        text: 'Permanent PDF Storage',
        included: true
      },
      {
        text: 'Edit Anytime',
        included: true
      },
      {
        text: 'Delete & Recreate Resumes',
        included: true
      },
      {
        text: 'Job Description Upload & Analysis',
        included: true
      },
      {
        text: 'AI Role Detection',
        included: true
      },
      {
        text: 'Keyword Gap Analysis',
        included: true
      },
      {
        text: 'Unlimited Bullet Regeneration',
        included: true
      },
      {
        text: 'Priority PDF Generation',
        included: true
      },
      {
        text: '10 Version History',
        included: true
      },
      {
        text: 'Markdown Export',
        included: true
      },
      {
        text: '3 Font Choices',
        included: true
      },
      {
        text: '5 Color Schemes',
        included: true
      },
      {
        text: 'Lifetime Access',
        included: true,
        highlight: true
      },
      {
        text: 'Early Adopter Status',
        included: true,
        highlight: true
      },
      {
        text: 'Lock in Price Forever',
        included: true,
        highlight: true
      }
    ],
    cta: {
      text: 'Claim Lifetime Deal',
      variant: 'premium'
    },
    limitations: [
      'Limited to first 500 customers',
      'Launch promotion only',
      'Creates urgency and FOMO'
    ],
    targetAudience: [
      'Early adopters',
      'Deal seekers',
      'Community builders'
    ],
    valueProposition: 'Pay once, use forever. Lock in price before it increases.'
  }
];

// Helper Functions
export const getPricingCard = (tier: typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS]): PricingCard | undefined => {
  return PRICING_CARDS.find(card => card.tier === tier);
};

export const getHighlightedCard = (): PricingCard | undefined => {
  return PRICING_CARDS.find(card => card.highlighted);
};

export const getPaidCards = (): PricingCard[] => {
  return PRICING_CARDS.filter(card => card.tier !== SUBSCRIPTION_TIERS.FREE);
};

export const getFreeCard = (): PricingCard | undefined => {
  return PRICING_CARDS.find(card => card.tier === SUBSCRIPTION_TIERS.FREE);
};

// Comparison Helper
export const getFeatureComparison = (): {
  feature: string;
  free: boolean;
  premiumMonthly: boolean;
  premiumAnnual: boolean;
  lifetime: boolean;
}[] => {
  const allFeatures = new Set<string>();
  
  PRICING_CARDS.forEach(card => {
    card.features.forEach(feature => {
      allFeatures.add(feature.text);
    });
  });

  return Array.from(allFeatures).map(featureText => {
    const comparison = {
      feature: featureText,
      free: false,
      premiumMonthly: false,
      premiumAnnual: false,
      lifetime: false
    };

    PRICING_CARDS.forEach(card => {
      const feature = card.features.find(f => f.text === featureText);
      if (feature?.included) {
        switch (card.tier) {
          case SUBSCRIPTION_TIERS.FREE:
            comparison.free = true;
            break;
          case SUBSCRIPTION_TIERS.PREMIUM_MONTHLY:
            comparison.premiumMonthly = true;
            break;
          case SUBSCRIPTION_TIERS.PREMIUM_ANNUAL:
            comparison.premiumAnnual = true;
            break;
          case SUBSCRIPTION_TIERS.LIFETIME:
            comparison.lifetime = true;
            break;
        }
      }
    });

    return comparison;
  });
};

// Pricing Display Helpers
export const formatPrice = (priceInCents: number): string => {
  return `$${(priceInCents / 100).toFixed(2)}`;
};

export const calculateAnnualSavings = (): number => {
  const monthlyYearly = PRICING.PREMIUM_MONTHLY * 12;
  const annual = PRICING.PREMIUM_ANNUAL;
  return monthlyYearly - annual;
};

export const calculateSavingsPercentage = (): number => {
  const monthlyYearly = PRICING.PREMIUM_MONTHLY * 12;
  const savings = calculateAnnualSavings();
  return Math.round((savings / monthlyYearly) * 100);
};

// Feature Categories for Organized Display
export const FEATURE_CATEGORIES = {
  RESUME_CREATION: 'Resume Creation',
  AI_FEATURES: 'AI Features',
  STORAGE_EXPORT: 'Storage & Export',
  TEMPLATES_CUSTOMIZATION: 'Templates & Customization'
} as const;

export const categorizeFeatures = (features: PricingFeature[]) => {
  return {
    [FEATURE_CATEGORIES.RESUME_CREATION]: features.filter(f => 
      f.text.includes('Slots') || 
      f.text.includes('Edit') || 
      f.text.includes('Delete')
    ),
    [FEATURE_CATEGORIES.AI_FEATURES]: features.filter(f =>
      f.text.includes('AI') ||
      f.text.includes('Job Description') ||
      f.text.includes('Keyword') ||
      f.text.includes('Regeneration')
    ),
    [FEATURE_CATEGORIES.STORAGE_EXPORT]: features.filter(f =>
      f.text.includes('Storage') ||
      f.text.includes('PDF') ||
      f.text.includes('Export') ||
      f.text.includes('Version')
    ),
    [FEATURE_CATEGORIES.TEMPLATES_CUSTOMIZATION]: features.filter(f =>
      f.text.includes('Template') ||
      f.text.includes('Font') ||
      f.text.includes('Color') ||
      f.text.includes('Customization')
    )
  };
};

export { SUBSCRIPTION_TIERS };