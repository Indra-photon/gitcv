import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { PrivacySection } from '../privacy-policy/PrivacySection'
import { DataList } from '../privacy-policy/DataList';

export function TermsContent() {
  return (
    <div className="space-y-12">
      {/* Acceptance of Terms */}
      <PrivacySection id="acceptance" title="Acceptance of Terms">
        <Paragraph className="text-pretty text-neutral-700">
          By accessing or using GitHub Resume Builder, you agree to be bound by
          these Terms of Service and all applicable laws and regulations. If you
          do not agree with any part of these terms, you may not use our service.
        </Paragraph>
        <Paragraph className="text-pretty text-neutral-700">
          These terms constitute a legally binding agreement between you and
          GitHub Resume Builder. Your continued use of the service signifies your
          acceptance of any updates or modifications to these terms.
        </Paragraph>
      </PrivacySection>

      {/* Service Description */}
      <PrivacySection id="service-description" title="Service Description">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          GitHub Resume Builder is a web-based platform that helps developers
          create professional resumes from their GitHub repositories using
          AI-powered content generation.
        </Paragraph>
        <SubHeading className="text-neutral-900 mb-4">
          Core Features
        </SubHeading>
        <DataList
          items={[
            'GitHub OAuth integration for repository access',
            'AI-powered resume content generation',
            'Multiple professional resume templates',
            'Role-specific resume tailoring',
            'PDF export and download functionality',
            'Resume editing and customization tools',
            'Version history and management',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          We reserve the right to modify, suspend, or discontinue any feature or
          aspect of the service at any time with or without notice.
        </Paragraph>
      </PrivacySection>

      {/* Account Registration */}
      <PrivacySection id="account-registration" title="Account Registration">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          To use our service, you must:
        </Paragraph>
        <DataList
          items={[
            'Be at least 16 years of age',
            'Provide accurate and complete registration information',
            'Have a valid GitHub account',
            'Maintain the security of your account credentials',
            'Notify us immediately of any unauthorized access',
            'Accept responsibility for all activities under your account',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          You may not create multiple accounts to circumvent limitations, abuse
          free tier benefits, or engage in fraudulent activity. We reserve the
          right to terminate accounts that violate this policy.
        </Paragraph>
      </PrivacySection>

      {/* Subscription Plans */}
      <PrivacySection id="subscription-plans" title="Subscription Plans">
        <SubHeading className="text-neutral-900 mb-4">Free Tier</SubHeading>
        <DataList
          items={[
            'Limited to 3 resume generations',
            'Basic AI-powered content generation',
            'Access to 1 resume template',
            'PDF downloads expire after 24 hours',
            'Standard resume editing features',
          ]}
        />

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Premium Monthly
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          Price: $10 per month
        </Paragraph>
        <DataList
          items={[
            'Unlimited resume generations',
            'Advanced AI with role-specific tailoring',
            'Job description upload and analysis',
            'Access to all premium templates',
            'PDF storage for 30 days',
            'Version history and resume management',
            'Markdown export functionality',
            'Priority support',
          ]}
        />

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Premium Annual
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          Price: $50 per year (save $70 compared to monthly)
        </Paragraph>
        <Paragraph className="text-pretty text-neutral-700">
          Includes all Premium Monthly features with annual billing at a
          discounted rate.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Lifetime Deal
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          Limited to first 500 customers at $49 one-time payment. Includes all
          premium features forever with no recurring charges. This offer may be
          discontinued at any time.
        </Paragraph>
      </PrivacySection>

      {/* Payment Terms */}
      <PrivacySection id="payment-terms" title="Payment Terms">
        <SubHeading className="text-neutral-900 mb-4">Billing</SubHeading>
        <DataList
          items={[
            'Monthly subscriptions are billed on the same day each month',
            'Annual subscriptions are billed once per year',
            'Lifetime deals are one-time payments',
            'All payments are processed securely through Stripe or Razorpay',
            'We do not store your payment card information',
            'Prices are in USD and include all applicable taxes',
          ]}
        />

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Refund Policy
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          We offer a 7-day money-back guarantee for first-time premium
          subscribers.
        </Paragraph>
        <DataList
          items={[
            'Refunds must be requested within 7 days of initial payment',
            'Refunds apply only to the first billing cycle',
            'Abuse of the refund policy may result in account termination',
            'Lifetime deal purchases are final after 7 days',
            'No refunds for partial months or unused time',
          ]}
        />

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Cancellation
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          You may cancel your subscription at any time. Upon cancellation, you
          will retain access to premium features until the end of your current
          billing period. No refunds will be issued for partial periods.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Price Changes
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          We reserve the right to change subscription prices at any time.
          Existing subscribers will be notified 30 days before any price increase
          takes effect. Continued use after the notice period constitutes
          acceptance of the new pricing.
        </Paragraph>
      </PrivacySection>

      {/* User Responsibilities */}
      <PrivacySection id="user-responsibilities" title="User Responsibilities">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          You are responsible for:
        </Paragraph>
        <DataList
          items={[
            'Ensuring the accuracy of information in your profile and resumes',
            'Maintaining the confidentiality of your account credentials',
            'Complying with all applicable laws when using the service',
            'Respecting intellectual property rights of others',
            'Using the service only for lawful, personal, and professional purposes',
            'Not sharing your account with others',
            'Backing up important resume data',
            'Verifying AI-generated content for accuracy before use',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          You acknowledge that while our AI generates content based on your
          GitHub repositories, you are solely responsible for reviewing,
          editing, and verifying all resume content before submitting it to
          employers.
        </Paragraph>
      </PrivacySection>

      {/* Intellectual Property */}
      <PrivacySection id="intellectual-property" title="Intellectual Property">
        <SubHeading className="text-neutral-900 mb-4">
          Our Intellectual Property
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          GitHub Resume Builder and all related materials, including but not
          limited to:
        </Paragraph>
        <DataList
          items={[
            'Website design and code',
            'Logo and branding elements',
            'Resume templates and layouts',
            'AI algorithms and prompts',
            'User interface and experience',
            'Documentation and guides',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-4">
          All these elements are owned by GitHub Resume Builder and protected by
          copyright, trademark, and other intellectual property laws. You may not
          copy, modify, distribute, or reverse engineer any part of our service.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Your Content
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          You retain all ownership rights to your resume content, profile
          information, and any materials you upload. By using our service, you
          grant us a limited license to process, store, and display your content
          solely for the purpose of providing the service to you.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          AI-Generated Content
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          Resume content generated by our AI based on your GitHub repositories
          belongs to you. You may use, modify, and distribute this content as you
          see fit. However, we retain the right to use anonymized, aggregated
          data to improve our AI models.
        </Paragraph>
      </PrivacySection>

      {/* GitHub Integration */}
      <PrivacySection id="github-integration" title="GitHub Integration">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          Our service requires access to your GitHub account through OAuth
          authentication.
        </Paragraph>
        <SubHeading className="text-neutral-900 mb-4">
          Permissions We Request
        </SubHeading>
        <DataList
          items={[
            'Read access to public repositories',
            'Read access to private repositories (only if explicitly granted)',
            'Access to repository metadata, languages, and statistics',
            'Read access to README files and documentation',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          We never write to, modify, or delete your repositories. We only read
          repository data to generate resume content. You may revoke our access
          at any time through your GitHub settings or our platform.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          GitHub Terms Compliance
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          Your use of GitHub Resume Builder does not exempt you from complying
          with GitHub Terms of Service. Any violation of GitHub policies may
          result in termination of our service to you.
        </Paragraph>
      </PrivacySection>

      {/* AI-Generated Content */}
      <PrivacySection id="ai-generated-content" title="AI-Generated Content">
        <SubHeading className="text-neutral-900 mb-4">
          Content Accuracy
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          Our AI analyzes your GitHub repositories to generate professional
          resume content. While we strive for accuracy:
        </Paragraph>
        <DataList
          items={[
            'AI-generated content may contain errors or inaccuracies',
            'You must review and verify all content before use',
            'We are not responsible for consequences of using unverified AI content',
            'AI suggestions should be treated as starting points, not final copy',
            'Technical descriptions may require manual refinement',
          ]}
        />

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Quality Tiers
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          Free tier users receive basic AI-generated content. Premium users
          receive advanced AI analysis with higher quality output. We make no
          guarantees about content quality differences, and results may vary.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          No Employment Guarantee
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          Using our service does not guarantee job interviews, employment, or
          career advancement. Resume success depends on many factors beyond our
          control, including your experience, skills, and the job market.
        </Paragraph>
      </PrivacySection>

      {/* Prohibited Uses */}
      <PrivacySection id="prohibited-uses" title="Prohibited Uses">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          You may not use our service to:
        </Paragraph>
        <DataList
          items={[
            'Create fraudulent or misleading resumes',
            'Misrepresent your skills, experience, or qualifications',
            'Generate resumes for other people without authorization',
            'Scrape, copy, or steal our resume templates or designs',
            'Reverse engineer our AI algorithms or prompts',
            'Abuse API rate limits or system resources',
            'Create multiple accounts to bypass subscription limits',
            'Share premium account access with others',
            'Use the service for illegal or unethical purposes',
            'Harass, threaten, or abuse our support team',
            'Attempt to hack, breach, or compromise our systems',
            'Upload malicious code or content',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          Violation of these prohibitions may result in immediate account
          termination without refund and potential legal action.
        </Paragraph>
      </PrivacySection>

      {/* Termination */}
      <PrivacySection id="termination" title="Termination">
        <SubHeading className="text-neutral-900 mb-4">
          Termination by You
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          You may terminate your account at any time through account settings.
          Upon termination, your subscription will be cancelled, and you will
          lose access to premium features at the end of your billing period. Your
          data will be deleted in accordance with our Privacy Policy.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-4">
          Termination by Us
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          We reserve the right to suspend or terminate your account if:
        </Paragraph>
        <DataList
          items={[
            'You violate these Terms of Service',
            'Your payment method fails repeatedly',
            'You engage in fraudulent or abusive behavior',
            'You create multiple accounts to abuse free tier',
            'You violate applicable laws or regulations',
            'We are required to do so by law',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          We will provide notice when reasonably possible, but reserve the right
          to terminate immediately for serious violations. No refunds will be
          issued for accounts terminated due to Terms of Service violations.
        </Paragraph>
      </PrivacySection>

      {/* Disclaimers */}
      <PrivacySection id="disclaimers" title="Disclaimers">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          THE SERVICE IS PROVIDED ON AN AS IS AND AS AVAILABLE BASIS. WE MAKE NO
          WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
        </Paragraph>
        <DataList
          items={[
            'The service will be uninterrupted, secure, or error-free',
            'AI-generated content will be accurate or suitable for your needs',
            'Resume content will result in job offers or interviews',
            'All features will be available at all times',
            'Your data will never be lost or corrupted',
            'Third-party integrations will always function properly',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          We disclaim all warranties of merchantability, fitness for a particular
          purpose, and non-infringement. Your use of the service is at your own
          risk.
        </Paragraph>
      </PrivacySection>

      {/* Limitation of Liability */}
      <PrivacySection
        id="limitation-of-liability"
        title="Limitation of Liability"
      >
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, GITHUB RESUME BUILDER SHALL NOT
          BE LIABLE FOR:
        </Paragraph>
        <DataList
          items={[
            'Any indirect, incidental, special, or consequential damages',
            'Loss of profits, revenue, data, or business opportunities',
            'Damages resulting from use of AI-generated content',
            'Damages from service interruptions or data loss',
            'Damages from third-party services (GitHub, payment processors)',
            'Damages exceeding the amount you paid in the last 12 months',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          Some jurisdictions do not allow limitation of liability for
          consequential damages. In such jurisdictions, our liability is limited
          to the greatest extent permitted by law.
        </Paragraph>
      </PrivacySection>

      {/* Indemnification */}
      <PrivacySection id="indemnification" title="Indemnification">
        <Paragraph className="text-pretty text-neutral-700">
          You agree to indemnify, defend, and hold harmless GitHub Resume
          Builder, its officers, directors, employees, and agents from any
          claims, damages, losses, liabilities, and expenses (including legal
          fees) arising from:
        </Paragraph>
        <DataList
          items={[
            'Your use or misuse of the service',
            'Your violation of these Terms of Service',
            'Your violation of any third-party rights',
            'Content you submit or generate through the service',
            'Your violation of applicable laws or regulations',
            'Any fraudulent or misleading resume content',
          ]}
        />
      </PrivacySection>

      {/* Changes to Terms */}
      <PrivacySection id="changes-to-terms" title="Changes to Terms">
        <Paragraph className="text-pretty text-neutral-700">
          We reserve the right to modify these Terms of Service at any time.
          Material changes will be communicated via:
        </Paragraph>
        <DataList
          items={[
            'Email notification to registered users',
            'Prominent notice on the platform',
            'Updated last modified date at the top of this page',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          Continued use of the service after changes take effect constitutes
          acceptance of the modified terms. If you disagree with changes, you
          must stop using the service and may cancel your account.
        </Paragraph>
      </PrivacySection>

      {/* Governing Law */}
      <PrivacySection id="governing-law" title="Governing Law">
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          These Terms of Service are governed by and construed in accordance with
          the laws of the jurisdiction where GitHub Resume Builder is
          incorporated, without regard to conflict of law principles.
        </Paragraph>
        <SubHeading className="text-neutral-900 mb-4">
          Dispute Resolution
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          Any disputes arising from these terms or your use of the service shall
          be resolved through binding arbitration rather than in court, except
          where prohibited by law. You waive any right to participate in class
          action lawsuits or class-wide arbitration.
        </Paragraph>
      </PrivacySection>

      {/* Contact */}
      <PrivacySection id="contact" title="Contact Information">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          For questions about these Terms of Service, please contact us:
        </Paragraph>
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-2">
          <p className="text-neutral-900 font-medium">
            GitHub Resume Builder Legal Team
          </p>
          <p className="text-neutral-700">Email: legal@githubresumebuilder.com</p>
          <p className="text-neutral-700">
            Support: support@githubresumebuilder.com
          </p>
          <p className="text-neutral-700">
            Response time: Within 3 business days
          </p>
        </div>
      </PrivacySection>

      {/* Footer Note */}
      <div className="border-t border-neutral-200 pt-8 mt-12">
        <Paragraph className="text-pretty text-neutral-500 text-sm">
          These Terms of Service are effective as of February 8, 2026. By using
          GitHub Resume Builder, you acknowledge that you have read, understood,
          and agree to be bound by these terms.
        </Paragraph>
      </div>
    </div>
  );
}