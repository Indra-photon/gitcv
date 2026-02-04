'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Heading } from '@/components/Heading';
import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, X, Sparkles, Crown, Zap, Info } from 'lucide-react';
import { PRICING_CARDS, type PricingCard, SUBSCRIPTION_TIERS } from '@/constants/pricing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { CalSans } from '@/lib/fonts';
import { toast } from 'sonner';

interface PricingSectionProps {
  APPLICATION_FORM_URL?: string;
  EXECUTIVE_ESCAPE_MAIL?: string;
  prices?: {
    insiderAccess?: string;
    insiderAccessOriginal?: string;
    mainExperience?: string;
    mainExperienceOriginal?: string;
    executiveEscape?: string;
    executiveEscapeOriginal?: string;
    spotsRemaining?: number;
    applicationsReceived?: number | null;
  };
}

type BillingCycle = 'monthly' | 'annual';

const getBadgeStyles = (variant: string) => {
  switch (variant) {
    case 'popular':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'best-value':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'limited':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
};

const getBadgeIcon = (variant: string) => {
  switch (variant) {
    case 'popular':
      return <Zap className="size-3" />;
    case 'best-value':
      return <Crown className="size-3" />;
    case 'limited':
      return <Sparkles className="size-3" />;
    default:
      return null;
  }
};

const BillingToggle = ({ 
  billingCycle, 
  setBillingCycle 
}: { 
  billingCycle: BillingCycle; 
  setBillingCycle: (cycle: BillingCycle) => void 
}) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      <Paragraph className={cn("text-sm text-neutral-700 font-medium tracking-tighter", CalSans.className)}>
        Monthly
      </Paragraph>
      
      <button
        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
        className={cn(
          "relative w-14 h-7 rounded-full transition-colors duration-200",
          billingCycle === 'annual' ? 'bg-green-600' : 'bg-neutral-300'
        )}
      >
        <motion.div
          className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-sm"
          layout
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
          animate={{
            x: billingCycle === 'annual' ? 28 : 0
          }}
        />
      </button>

      <div className="flex items-center gap-2">
        <Paragraph className={cn("text-sm text-neutral-700 font-medium tracking-tighter", CalSans.className)}>
          Annual
        </Paragraph>
        <Badge className={cn("bg-green-100 text-green-700 border-green-200 text-xs tracking-tighter", CalSans.className)}>
          Save 58%
        </Badge>
      </div>
    </div>
  );
};

const PremiumCard = ({ 
  billingCycle,
  handleUpgrade
}: { 
  billingCycle: BillingCycle;
  handleUpgrade: (tier: string) => void;
}) => {
  const monthlyCard = PRICING_CARDS.find(c => c.tier === SUBSCRIPTION_TIERS.PREMIUM_MONTHLY);
  const annualCard = PRICING_CARDS.find(c => c.tier === SUBSCRIPTION_TIERS.PREMIUM_ANNUAL);
  
  const activeCard = billingCycle === 'monthly' ? monthlyCard : annualCard;
  
  if (!activeCard) return null;

  const springConfig = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30
  };

  return (
    <Card className="relative h-full flex flex-col border-2 border-neutral-900 shadow-lg">
      {/* Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={billingCycle}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={springConfig}
          >
            <Badge className={cn("flex items-center gap-1 border", getBadgeStyles(activeCard.badge?.variant || 'default'))}>
              {activeCard.badge && getBadgeIcon(activeCard.badge.variant)}
              <span className={cn("text-xs font-medium", CalSans.className)}>{activeCard.badge?.text}</span>
            </Badge>
          </motion.div>
        </AnimatePresence>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className={cn("text-2xl font-bold text-neutral-900 tracking-tighter", CalSans.className)}>
          Premium
        </CardTitle>
        <AnimatePresence mode="wait">
          <motion.div
            key={billingCycle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springConfig}
          >
            <CardDescription className="text-sm text-neutral-600 text-pretty tracking-tighter">
              {activeCard.tagline}
            </CardDescription>
          </motion.div>
        </AnimatePresence>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Price */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={billingCycle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={springConfig}
              className="flex items-baseline gap-2"
            >
              <span className={cn("text-4xl font-bold text-neutral-900 tabular-nums tracking-tighter", CalSans.className)}>
                {activeCard.displayPrice}
              </span>
              {activeCard.billingCycle !== 'once' && activeCard.billingCycle !== 'forever' && (
                <span className={cn("text-sm text-neutral-500 tracking-tighter", CalSans.className)}>
                  /{activeCard.billingCycle}
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {activeCard.savings && (
              <motion.p
                key="savings"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={springConfig}
                className={cn("text-sm font-medium text-green-700 tracking-tighter", CalSans.className)}
              >
                Save {activeCard.savings}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Features */}
        <ul className="space-y-3">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={billingCycle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='space-y-3'
            >
              {activeCard.features.slice(0, 10).map((feature, idx) => (
                <motion.li 
                  key={`${billingCycle}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03, ...springConfig }}
                  className="flex items-start gap-2"
                >
                  {feature.included ? (
                    <Check className="size-5 text-neutral-800 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="size-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex items-start gap-1 flex-1">
                    <span 
                      className={cn(
                        "text-sm text-pretty tracking-tighter",
                        feature.included ? "text-neutral-900" : "text-neutral-400",
                        feature.highlight && "font-medium",
                      )}
                    >
                      {feature.text}
                    </span>
                    {feature.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="size-3 text-neutral-400 flex-shrink-0 mt-1 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.div>
          </AnimatePresence>
        </ul>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          className={cn("w-full bg-neutral-900 text-white hover:bg-neutral-800 tracking-tighter", CalSans.className)}
          size="lg"
          onClick={() => handleUpgrade(billingCycle === 'monthly' ? 'premium_monthly' : 'premium_annual')}
        >
          {activeCard.cta.text}
        </Button>
      </CardFooter>
    </Card>
  );
};

const StaticPricingCard = ({ 
  card, 
  index,
  handleUpgrade 
}: { 
  card: PricingCard; 
  index: number;
  handleUpgrade: (tier: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={cn(
          "relative h-full flex flex-col border-2 transition-all duration-200 border-neutral-200 hover:border-neutral-300"
        )}
      >
        {/* Badge */}
        {card.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className={cn("flex items-center gap-1 border", getBadgeStyles(card.badge.variant))}>
              {getBadgeIcon(card.badge.variant)}
              <span className={cn("text-xs font-medium", CalSans.className)}>{card.badge.text}</span>
            </Badge>
          </div>
        )}

        <CardHeader className="pb-4">
          <CardTitle className={cn("text-2xl font-bold text-neutral-900 tracking-tighter", CalSans.className)}>
            {card.name}
          </CardTitle>
          <CardDescription className={cn("text-sm text-neutral-600 text-pretty tracking-tighter")}>
            {card.tagline}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 space-y-6">
          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className={cn("text-4xl font-bold text-neutral-900 tabular-nums tracking-tighter", CalSans.className)}>
                {card.displayPrice}
              </span>
              {card.billingCycle !== 'once' && card.billingCycle !== 'forever' && (
                <span className={cn("text-sm text-neutral-500 tracking-tighter", CalSans.className)}>
                  /{card.billingCycle}
                </span>
              )}
            </div>
            {card.billingCycle === 'once' && (
              <p className={cn("text-xs text-neutral-500 tracking-tighter", CalSans.className)}>
                One-time payment
              </p>
            )}
            {card.billingCycle === 'forever' && (
              <p className={cn("text-xs text-neutral-500 tracking-tighter", CalSans.className)}>
                Free forever
              </p>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {card.features.slice(0, 10).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                {feature.included ? (
                  <Check className="size-5 text-neutral-800 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="size-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex items-start gap-1 flex-1">
                  <span 
                    className={cn(
                      "text-sm text-pretty tracking-tighter",
                      feature.included ? "text-neutral-900" : "text-neutral-400",
                      feature.highlight && "font-medium"
                    )}
                  >
                    {feature.text}
                  </span>
                  {feature.tooltip && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="size-3 text-neutral-400 flex-shrink-0 mt-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">{feature.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-4">
          <Button
            className={cn("w-full bg-white text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-50 tracking-tighter", CalSans.className)}
            size="lg"
            onClick={() => handleUpgrade(card.tier === SUBSCRIPTION_TIERS.FREE ? 'free' : 'lifetime')}
          >
            {card.cta.text}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ComparisonTable = () => {
  const features = [
    { name: 'Resume Slots', free: '3', premium: 'Unlimited' },
    { name: 'AI Quality', free: 'Standard (80-85%)', premium: 'Advanced (100%)' },
    { name: 'Templates', free: '1 ATS Template', premium: '5 Premium Templates' },
    // { name: 'PDF Storage', free: '15 Days', premium: 'Permanent' },
    { name: 'Edit After Save', free: false, premium: true },
    { name: 'Delete Resumes', free: false, premium: true },
    { name: 'Job Description Upload', free: false, premium: true },
    { name: 'Keyword Gap Analysis', free: false, premium: true },
    { name: 'Version History', free: false, premium: true },
    { name: 'Markdown Export', free: false, premium: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className={cn("px-6 py-4 text-left text-sm font-semibold text-neutral-900 tracking-tighter", CalSans.className)}>
                  Feature
                </th>
                <th className={cn("px-6 py-4 text-center text-sm font-semibold text-neutral-900 tracking-tighter", CalSans.className)}>
                  Free
                </th>
                <th className={cn("px-6 py-4 text-center text-sm font-semibold text-neutral-900 bg-neutral-100 tracking-tighter", CalSans.className)}>
                  Premium
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className={cn("px-6 py-4 text-sm text-neutral-900 tracking-tighter", CalSans.className)}>
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? (
                        <Check className="size-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="size-5 text-neutral-300 mx-auto" />
                      )
                    ) : (
                      <span className={cn("text-neutral-700 tabular-nums tracking-tighter", CalSans.className)}>{feature.free}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm bg-neutral-50">
                    {typeof feature.premium === 'boolean' ? (
                      feature.premium ? (
                        <Check className="size-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="size-5 text-neutral-300 mx-auto" />
                      )
                    ) : (
                      <span className={cn("text-neutral-900 font-medium tabular-nums tracking-tighter", CalSans.className)}>{feature.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const PricingSection = ({ 
  APPLICATION_FORM_URL, 
  EXECUTIVE_ESCAPE_MAIL, 
  prices 
}: PricingSectionProps) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');

  const freeCard = PRICING_CARDS.find(c => c.tier === SUBSCRIPTION_TIERS.FREE);
  const lifetimeCard = PRICING_CARDS.find(c => c.tier === SUBSCRIPTION_TIERS.LIFETIME);

  const handleUpgrade = async (tier: string) => {
  try {
    const response = await fetch('/api/checkout/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier })
    })

    if (response.status === 401) {
      toast.error('Please sign in to start')
      window.location.href = '/sign-in'
      return
    }

    if (!response.ok) {
      const error = await response.json()
      toast.error(error.error || 'Failed to start checkout')
      return
    }

    const { checkout_url } = await response.json()
    window.location.href = checkout_url
  } catch (error) {
    console.error('Checkout error:', error)
    toast.error('Failed to start checkout. Please try again.')
  }
}

  return (
    <Container className="w-full border-l border-r border-stone-300 py-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="w-full relative">
          {/* Dashed Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 0",
              maskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                )
              `,
              WebkitMaskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                )
              `,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />

          {/* Section Header */}
          <div className="mb-16 text-center border-t border-b border-neutral-600 relative overflow-hidden py-8">
            <Heading className={cn("text-neutral-900 tracking-tighter", CalSans.className)}>
              Simple, Transparent Pricing
            </Heading>
            <Paragraph className={cn("max-w-3xl mx-auto text-neutral-600 tracking-tighter", CalSans.className)}>
              Start free and upgrade when you need unlimited resumes and advanced AI features.
            </Paragraph>
          </div>
        </div>

        {/* Billing Toggle */}
        <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-12">
          {/* Free Card */}
          {freeCard && <StaticPricingCard card={freeCard} index={0} handleUpgrade={handleUpgrade} />}
          
          {/* Premium Card (Animated) */}
          <PremiumCard billingCycle={billingCycle} handleUpgrade={handleUpgrade} />
          
          {/* Lifetime Card */}
          {lifetimeCard && <StaticPricingCard card={lifetimeCard} index={2} handleUpgrade={handleUpgrade} />}
        </div>

        {/* Comparison Table */}
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="mt-20 text-center">
            <SubHeading className={cn("text-neutral-900 tracking-tighter", CalSans.className)}>
              Compare Plans
            </SubHeading>
            <Paragraph className={cn("max-w-2xl mx-auto text-neutral-600 tracking-tighter", CalSans.className)}>
              See exactly what you get with each plan at a glance.
            </Paragraph>
          </div>
          
          <ComparisonTable />
        </div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 px-4 sm:px-6 lg:px-12"
        >
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 text-center">
            <SubHeading className={cn("text-neutral-900 tracking-tighter", CalSans.className)}>
              Not sure which plan is right for you?
            </SubHeading>
            <Paragraph className={cn("max-w-2xl mx-auto text-neutral-600 tracking-tighter", CalSans.className)}>
              Start with our free plan and experience AI-powered resume generation. You can always upgrade later when you need more features.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <Button size="lg" className={cn("bg-neutral-900 text-white hover:bg-neutral-800 tracking-tighter", CalSans.className)}>
                Start Free
              </Button>
              <Button size="lg" variant="outline" className={cn("border-neutral-900 text-neutral-900 hover:bg-neutral-50 tracking-tighter", CalSans.className)}>
                View Documentation
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Lifetime Deal Urgency Banner */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 px-4 sm:px-6 lg:px-12"
        >
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Sparkles className="size-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <Paragraph className={cn("font-semibold text-neutral-900 tracking-tighter", CalSans.className)}>
                    Limited Lifetime Deal
                  </Paragraph>
                  <Paragraph className={cn("text-neutral-700 tracking-tighter", CalSans.className)}>
                    Only 500 lifetime memberships available at $49
                  </Paragraph>
                </div>
              </div>
              <Button className={cn("bg-orange-600 text-white hover:bg-orange-700 whitespace-nowrap tracking-tighter", CalSans.className)}>
                Claim Your Spot
              </Button>
            </div>
          </div>
        </motion.div> */}

      </div>
    </Container>
  );
};

export default PricingSection;