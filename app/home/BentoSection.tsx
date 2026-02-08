import Image from 'next/image';
import { Heading } from '@/components/Heading';
import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';
import GitHubConnectCard from './GitHubConnectCard';
import StatisticsCard from './StatisticsCard';
import AIGenerationCard from './AIGenerationCard';
import RoleTailoringCard from './RoleTailoringCard';

const BentoSection = () => {
  return (
    <Container className="w-full border-l border-r border-stone-300 pb-24">
      <div className="">

        <div className=" w-full relative">
            {/* Dashed Grid */}
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
              <div className="mb-16 text-center border-t border-b border-stone-600 relative overflow-hidden py-8">
                <Heading className="font-black text-neutral-900 tracking-tight mb-2 text-balance">
                  Why Developers Choose Us
                </Heading>
                <Paragraph className=" text-neutral-600 font-medium max-w-3xl mx-auto text-pretty">
                  From GitHub repos to professional resumes in minutes. No more manual formatting or generic descriptions.
                </Paragraph>
              </div>
        </div>


        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto px-2 sm:px-12">
          
          {/* Card 1 - GitHub Connect */}
          <GitHubConnectCard />

          {/* Card 2 - Statistics (Large - spans 2 columns) */}
          <StatisticsCard />

          {/* Card 3 - AI Generation Preview (Large - spans 2 columns on desktop) */}
          <AIGenerationCard />

          {/* Card 4 - Role Tailoring */}
          {/* <RoleTailoringCard /> */}

          {/* Card 5 - Tech Stack Detection */}
          {/* <TechStackCard /> */}

          {/* Card 6 - Export Options */}
          {/* <ExportCard /> */}

        </div>
      </div>
    </Container>
  );
};


export default BentoSection;