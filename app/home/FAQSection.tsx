'use client';

import { motion } from 'motion/react';
import { Heading } from '@/components/Heading';
import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How does the GitHub Resume Builder work?',
    answer: 'Connect your GitHub account, select your repositories, choose a role (Frontend, Backend, Full-Stack, etc.), and our AI analyzes your code to generate professional bullet points. You can then customize and export your resume as PDF or Markdown.',
  },
  {
    question: 'What\'s the difference between Free and Premium?',
    answer: 'Free tier gives you 3 resume slots with standard AI quality and 15-day PDF storage. Premium offers unlimited resumes, advanced AI (100% quality), permanent storage, job description analysis, keyword gap analysis, and premium templates.',
  },
  {
    question: 'Can I edit the AI-generated content?',
    answer: 'Absolutely! While our AI generates professional descriptions, you have full control to edit, rearrange, or rewrite any content. Premium users can also regenerate bullets unlimited times until they\'re perfect.',
  },
  {
    question: 'Is my resume ATS-friendly?',
    answer: 'Yes! All our templates are designed to pass Applicant Tracking Systems. We use clean formatting, standard fonts, and proper section headers that ATS software can easily parse.',
  },
  {
    question: 'How long does it take to create a resume?',
    answer: 'Most developers create a complete, professional resume in 10-15 minutes. This includes connecting GitHub, selecting projects, choosing a role, and making final customizations.',
  },
  {
    question: 'What happens to my data?',
    answer: 'We only access public repository data via GitHub OAuth. We never access your private code without explicit permission. Your resume data is securely stored and you can delete it anytime from your profile.',
  },
  {
    question: 'Can I create multiple resumes for different roles?',
    answer: 'Yes! Free users can save up to 3 resumes. Premium users get unlimited resumes, perfect for tailoring your application to different positions like Frontend Developer, DevOps Engineer, or Full-Stack roles.',
  },
  {
    question: 'What if I don\'t have many GitHub projects?',
    answer: 'You need at least 2-3 projects to generate a meaningful resume. If you\'re just starting, we recommend building a few showcase projects first. Check our blog for project ideas that impress recruiters.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes! We offer a 7-day money-back guarantee for all paid plans. If you\'re not satisfied with Premium, contact support within 7 days for a full refund.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Absolutely. You can cancel your Premium subscription anytime from your profile settings. You\'ll retain access until the end of your billing period, and your resumes will remain accessible in read-only mode.',
  },
];

const FAQSection = () => {
  return (
    <Container className="w-full border-l border-r border-stone-300 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Side - Heading & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="lg:sticky lg:top-24">
              <Heading className="text-neutral-900 mb-4">
                Frequently Asked Questions
              </Heading>
              <Paragraph className="text-neutral-600 mb-8">
                Everything you need to know about creating professional resumes from your GitHub repositories.
              </Paragraph>

              {/* CTA Button */}
              {/* <Button 
                size="lg"
                className="bg-neutral-900 text-white hover:bg-neutral-800 w-full sm:w-auto"
              >
                <MessageCircle className="size-5 mr-2" />
                Still have questions?
              </Button> */}

              {/* Additional Info */}
              {/* <div className="mt-8 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                <Paragraph className="text-sm text-neutral-700">
                  Can't find what you're looking for? Our support team is here to help.
                </Paragraph>
                <Paragraph className="text-sm text-neutral-500 mt-2">
                  Average response time: 2 hours
                </Paragraph>
              </div> */}
            </div>
          </motion.div>

          {/* Right Side - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-neutral-200 rounded-lg px-6 bg-white hover:border-neutral-300 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="text-base font-medium text-neutral-900 pr-4 tracking-tighter">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <Paragraph className="text-neutral-600">
                      {faq.answer}
                    </Paragraph>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </Container>
  );
};

export default FAQSection;