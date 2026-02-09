'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Heading } from '@/components/Heading';
import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Templates', href: '/templates' },
      { label: 'How it Works', href: '/how-it-works' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Resume Guide', href: '/guides/resume' },
      { label: 'API', href: '/api-docs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: Github,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourhandle',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/yourcompany',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:support@yourproduct.com',
    icon: Mail,
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
        <div className=" py-32 px-4 sm:px-6 lg:px-12">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <SubHeading className="text-white mb-3">
                  GitHub Resume Builder
                </SubHeading>
                <Paragraph className="text-neutral-400 mb-6">
                  Transform your GitHub repositories into professional, ATS-friendly resumes in minutes. Powered by AI.
                </Paragraph>

                {/* Newsletter Signup */}
                <div className="space-y-3">
                  <Paragraph className="text-sm font-medium text-neutral-300">
                    Stay updated with tips and features
                  </Paragraph>
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-neutral-600"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-white text-neutral-900 hover:bg-neutral-100 whitespace-nowrap"
                    >
                      <ArrowRight className="size-4" />
                    </Button>
                  </form>
                  {isSubscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-green-400"
                    >
                      Thanks for subscribing!
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Links Section */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                  >
                    <Paragraph className="font-semibold text-white mb-4">
                      {section.title}
                    </Paragraph>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              "text-sm text-neutral-400 hover:text-white transition-colors",
                              "inline-block"
                            )}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Paragraph className="text-sm text-neutral-500">
                © {new Date().getFullYear()} GitHub Resume Builder. All rights reserved.
              </Paragraph>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-full bg-neutral-800 hover:bg-neutral-700",
                    "transition-colors duration-200",
                    "text-neutral-400 hover:text-white"
                  )}
                  aria-label={social.name}
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Attribution (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-0 text-left"
          >
            <Paragraph className="text-xs text-neutral-200">
              Built by <Link href="https://www.indrabuildswebsites.com/" className="font-semibold underline">Indranil</Link> and <Link href="https://adityaportfolio-two.vercel.app/" className="font-semibold underline">Aditya</Link>  for developers
            </Paragraph>
          </motion.div>

        </div>
    </footer>
  );
};

export default Footer;