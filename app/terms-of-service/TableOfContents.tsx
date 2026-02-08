'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'service-description', label: 'Service Description' },
  { id: 'account-registration', label: 'Account Registration' },
  { id: 'subscription-plans', label: 'Subscription Plans' },
  { id: 'payment-terms', label: 'Payment Terms' },
  { id: 'user-responsibilities', label: 'User Responsibilities' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'github-integration', label: 'GitHub Integration' },
  { id: 'ai-generated-content', label: 'AI-Generated Content' },
  { id: 'prohibited-uses', label: 'Prohibited Uses' },
  { id: 'termination', label: 'Termination' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'limitation-of-liability', label: 'Limitation of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'changes-to-terms', label: 'Changes to Terms' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'contact', label: 'Contact Information' },
];

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState('acceptance');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-24">
      <p className="text-sm font-medium text-neutral-900 mb-4">
        On this page
      </p>
      <ul className="space-y-2">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className={cn(
                'text-sm text-left transition-colors duration-150',
                'hover:text-neutral-900',
                activeSection === id
                  ? 'text-neutral-900 font-medium'
                  : 'text-neutral-500'
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}