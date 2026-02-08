import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { TermsContent } from './TermsContent';
import { TableOfContents } from './TableOfContents';

export const metadata: Metadata = {
  title: 'Terms of Service | GitHub Resume Builder',
  description:
    'Terms and conditions for using GitHub Resume Builder. Learn about your rights, obligations, and our service policies.',
};

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-white">
      {/* Header */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <Container className="py-16">
          <Heading className="text-balance mb-4">Terms of Service</Heading>
          <Paragraph className="text-pretty text-neutral-600 max-w-3xl">
            Last updated: February 8, 2026
          </Paragraph>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents - Sticky Sidebar */}
          <aside className="lg:col-span-3">
            <TableOfContents />
          </aside>

          {/* Terms Content */}
          <main className="lg:col-span-9">
            <TermsContent />
          </main>
        </div>
      </Container>
    </div>
  );
}