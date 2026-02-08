import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { PrivacySection } from './PrivacySection';
import { DataList } from './DataList';

export default function PrivacyContent() {
  return (
    <div className="space-y-12">
      {/* Overview */}
      <PrivacySection id="overview" title="Overview">
        <Paragraph className="text-pretty text-neutral-700">
          GitHub Resume Builder is committed to protecting your privacy. This
          policy explains how we collect, use, store, and protect your personal
          information when you use our service to generate professional resumes
          from your GitHub repositories.
        </Paragraph>
        <Paragraph className="text-pretty text-neutral-700">
          By using our service, you agree to the collection and use of
          information in accordance with this policy. We only collect data
          necessary to provide and improve our resume generation service.
        </Paragraph>
      </PrivacySection>

      {/* Information We Collect */}
      <PrivacySection
        id="information-we-collect"
        title="Information We Collect"
      >
        <SubHeading className="text-neutral-900 mb-4">
          Account Information
        </SubHeading>
        <DataList
          items={[
            'Full name and professional headline',
            'Email address and phone number',
            'Location (city and country)',
            'GitHub username (via OAuth authentication)',
            'Portfolio and LinkedIn URLs (optional)',
            'Education history and work experience',
            'Skills and certifications',
          ]}
        />

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          GitHub Data
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          When you connect your GitHub account, we access:
        </Paragraph>
        <DataList
          items={[
            'Public repository information (name, description, stars, forks)',
            'Repository languages and technologies used',
            'Commit history and contribution statistics',
            'README files and documentation',
            'Package.json, requirements.txt, and dependency files',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-4">
          We do not access your private repositories unless you explicitly grant
          permission. We never modify or write to your GitHub repositories.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Resume Data
        </SubHeading>
        <DataList
          items={[
            'Generated resume content and customizations',
            'Selected resume templates and formatting preferences',
            'Job descriptions uploaded for role-specific tailoring',
            'Resume versions and edit history',
            'PDF exports and download timestamps',
          ]}
        />

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Usage Information
        </SubHeading>
        <DataList
          items={[
            'Device information (browser type, operating system)',
            'IP address and general location',
            'Pages visited and features used',
            'Time spent on the platform',
            'Error logs and crash reports',
          ]}
        />
      </PrivacySection>

      {/* How We Use Your Data */}
      <PrivacySection id="how-we-use-data" title="How We Use Your Data">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          We use your information to:
        </Paragraph>
        <DataList
          items={[
            'Generate AI-powered resume content from your GitHub repositories',
            'Provide role-specific resume tailoring based on job descriptions',
            'Store and manage your resume versions',
            'Process payments for premium subscriptions',
            'Send important account notifications and updates',
            'Improve our AI models and resume generation quality',
            'Analyze platform usage to enhance user experience',
            'Prevent fraud and ensure platform security',
            'Comply with legal obligations',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          We never sell your personal information to third parties. We do not
          use your data for advertising purposes.
        </Paragraph>
      </PrivacySection>

      {/* Data Storage & Security */}
      <PrivacySection id="data-storage" title="Data Storage & Security">
        <SubHeading className="text-neutral-900 mb-4">
          Where We Store Your Data
        </SubHeading>
        <DataList
          items={[
            'User profiles and resume data: MongoDB Atlas (encrypted at rest)',
            'PDF exports: Cloudinary (with 24-hour auto-deletion for free tier)',
            'Payment information: Stripe or Razorpay (we do not store card details)',
            'Analytics data: Anonymized and aggregated',
          ]}
        />

        <SubHeading className="text-neutral-900 mb-4 mt-8">
          Security Measures
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          We implement industry-standard security practices:
        </Paragraph>
        <DataList
          items={[
            'All data transmitted over HTTPS with TLS encryption',
            'Passwords hashed using bcrypt with salt',
            'JWT-based authentication with secure token rotation',
            'Regular security audits and vulnerability scanning',
            'Access controls and role-based permissions',
            'Automated backups with 30-day retention',
            'DDoS protection and rate limiting',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          While we strive to protect your data, no method of transmission over
          the internet is completely secure. We cannot guarantee absolute
          security but maintain vigilant monitoring and rapid response protocols.
        </Paragraph>
      </PrivacySection>

      {/* Third-Party Services */}
      <PrivacySection id="third-party-services" title="Third-Party Services">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          We use trusted third-party services to provide our platform:
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3 mt-6">GitHub</SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          OAuth authentication and repository data access. Governed by{' '}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 underline hover:no-underline"
          >
            GitHub Privacy Policy
          </a>
          .
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3 mt-6">
          Payment Processors
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          Stripe (US/International) or Razorpay (India) for subscription billing.
          We do not store your payment card information. Governed by their
          respective privacy policies.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3 mt-6">
          Cloudinary
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          PDF storage and delivery. Free tier PDFs are automatically deleted after
          24 hours. Premium PDFs are stored for 30 days.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3 mt-6">
          AI Services
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          We use OpenAI or Anthropic APIs for resume content generation. Your
          repository data is sent to these services solely for processing and is
          not used for model training. All API calls are logged for quality
          assurance.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3 mt-6">
          Analytics
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          We use privacy-focused analytics to understand usage patterns.
          Analytics data is anonymized and aggregated.
        </Paragraph>
      </PrivacySection>

      {/* AI Processing */}
      <PrivacySection id="ai-processing" title="AI & Data Processing">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          Our AI-powered resume generation works as follows:
        </Paragraph>
        <DataList
          items={[
            'Your GitHub repository data (README, dependencies, code structure) is analyzed',
            'Data is sent to AI providers (OpenAI/Anthropic) via secure API',
            'AI generates professional resume bullet points based on detected technologies',
            'Generated content is returned and stored in our database',
            'You retain full ownership of all resume content',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          Free tier users receive AI-generated content with basic quality. Premium
          users receive advanced AI analysis with role-specific tailoring and job
          description matching.
        </Paragraph>
        <Paragraph className="text-pretty text-neutral-700 mt-4">
          We do not use your data to train our own AI models. Third-party AI
          providers may log requests for abuse prevention but do not use your data
          for model training per their enterprise agreements.
        </Paragraph>
      </PrivacySection>

      {/* Your Rights */}
      <PrivacySection id="your-rights" title="Your Privacy Rights">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          You have the following rights regarding your data:
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3">
          Access Your Data
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          Request a copy of all personal data we hold about you. We will provide
          this in machine-readable format (JSON) within 30 days.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3">
          Edit Your Data
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          Update your profile information, education, work experience, and
          preferences at any time through your account settings.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3">
          Delete Your Data
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          Permanently delete your account and all associated data. This action is
          irreversible. Resume PDFs stored on Cloudinary will be deleted within 24
          hours. Database records will be purged within 30 days (required for
          billing reconciliation).
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3">
          Export Your Data
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          Download all your resume data in JSON or Markdown format. This includes
          all resume versions, profile information, and generated content.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3">
          Opt-Out of Analytics
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          Disable analytics tracking in your account settings. Note that essential
          analytics for security and fraud prevention cannot be disabled.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3">
          Revoke GitHub Access
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          Disconnect your GitHub account at any time. Previously generated resumes
          will remain available, but you will not be able to fetch new repository
          data.
        </Paragraph>
      </PrivacySection>

      {/* Cookies */}
      <PrivacySection id="cookies" title="Cookies & Tracking">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          We use cookies and similar technologies for:
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3 mt-6">
          Essential Cookies
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          Required for authentication, security, and basic functionality. These
          cannot be disabled as the platform will not function without them.
          Includes session tokens and CSRF protection.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3">
          Analytics Cookies
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700 mb-6">
          Help us understand how you use the platform. These are anonymized and
          can be disabled in your account settings.
        </Paragraph>

        <SubHeading className="text-neutral-900 mb-3">
          Preference Cookies
        </SubHeading>
        <Paragraph className="text-pretty text-neutral-700">
          Remember your settings such as theme preference, template selection, and
          UI customizations. These cookies do not track you across websites.
        </Paragraph>
      </PrivacySection>

      {/* Data Retention */}
      <PrivacySection id="data-retention" title="Data Retention">
        <DataList
          items={[
            'Active accounts: Data retained indefinitely while account is active',
            'Inactive accounts (>2 years): Notified before potential deletion',
            'Deleted accounts: Data purged within 30 days (except billing records required by law)',
            'Free tier PDFs: Auto-deleted after 24 hours',
            'Premium PDFs: Retained for 30 days, then archived',
            'Backup systems: 30-day retention for disaster recovery',
            'Audit logs: 90 days for security and fraud prevention',
            'Billing records: 7 years (legal requirement)',
          ]}
        />
      </PrivacySection>

      {/* Children */}
      <PrivacySection id="children" title="Children's Privacy">
        <Paragraph className="text-pretty text-neutral-700">
          Our service is not directed to individuals under 16 years of age. We do
          not knowingly collect personal information from children. If you are a
          parent or guardian and believe your child has provided us with personal
          information, please contact us immediately. We will delete such
          information from our systems within 48 hours of verification.
        </Paragraph>
        <Paragraph className="text-pretty text-neutral-700 mt-4">
          Users between 16-18 years old may use the service with parental consent,
          particularly students creating resumes for internship applications.
        </Paragraph>
      </PrivacySection>

      {/* Changes */}
      <PrivacySection id="changes" title="Changes to This Policy">
        <Paragraph className="text-pretty text-neutral-700">
          We may update this privacy policy periodically to reflect changes in our
          practices or legal requirements. Material changes will be notified via:
        </Paragraph>
        <DataList
          items={[
            'Email notification to registered users',
            'Prominent banner on the platform',
            'Updated "Last modified" date at the top of this page',
          ]}
        />
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          Continued use of the service after policy updates constitutes acceptance
          of the revised terms. If you disagree with changes, you may delete your
          account before the effective date.
        </Paragraph>
      </PrivacySection>

      {/* Contact */}
      <PrivacySection id="contact" title="Contact Us">
        <Paragraph className="text-pretty text-neutral-700 mb-4">
          If you have questions about this privacy policy or wish to exercise your
          privacy rights, contact us:
        </Paragraph>
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-2">
          <p className="text-neutral-900 font-medium">
            GitHub Resume Builder Privacy Team
          </p>
          <p className="text-neutral-700">Email: privacy@githubresumebuilder.com</p>
          <p className="text-neutral-700">
            Response time: Within 3 business days
          </p>
        </div>
        <Paragraph className="text-pretty text-neutral-700 mt-6">
          For GDPR-related requests (EU residents), please include "GDPR Request"
          in your subject line. We will respond within 30 days as required by law.
        </Paragraph>
        <Paragraph className="text-pretty text-neutral-700 mt-4">
          For CCPA-related requests (California residents), please include "CCPA
          Request" in your subject line. We will respond within 45 days as
          required by law.
        </Paragraph>
      </PrivacySection>

      {/* Footer Note */}
      <div className="border-t border-neutral-200 pt-8 mt-12">
        <Paragraph className="text-pretty text-neutral-500 text-sm">
          This privacy policy is effective as of February 8, 2026. By using GitHub
          Resume Builder, you acknowledge that you have read and understood this
          policy.
        </Paragraph>
      </div>
    </div>
  );
}