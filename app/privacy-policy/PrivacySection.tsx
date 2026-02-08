import { Container } from '@/components/Container';
import { SubHeading } from '@/components/SubHeading';

interface PrivacySectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function PrivacySection({ id, title, children }: PrivacySectionProps) {
  return (
    <Container className="scroll-mt-24">
      <SubHeading className="text-balance text-neutral-900 mb-6">
        {title}
      </SubHeading>
      <div className="space-y-4">{children}</div>
    </Container>
  );
}