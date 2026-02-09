import React from 'react';
import localFont from "next/font/local";
import { IconKey, IconUserEdit, IconSparkles, IconFileCvFilled } from '@tabler/icons-react';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';

// Font configuration as per UI_SKILLS.md
const CalSans = localFont({
  src: [{ path: "../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
});

interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const StepCard = ({ stepNumber, title, description, icon }: StepCardProps) => {
  return (
    <div className="relative w-full max-w-[350px] group">
      {/* 1. The Brown Badge - Positioned to sit in the "cut-out" */}
      <div className="absolute top-4 left-3 z-20">
        <div 
          className="bg-neutral-900 text-white font-bold text-xl"
          style={{
            width: '110px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: 'inset(0 round 24px 0px 18px 0px)',
          }}
        >
          STEP {stepNumber}
        </div>
      </div>

      {/* 2. The Main Card with the specific Clip-Path Notch */}
      <div 
        className="relative mt-6 w-full min-h-[450px] bg-linear-to-b from-neutral-200 via-neutral-300 to-neutral-400 rounded-[3rem] p-12 "
        style={{
          // Depth reduced to 50, Length extended, and added a 20px radius to the left corner
          clipPath: `path("M 0,70 L 0,400 A 50,50 0 0 0 50,450 L 300,450 A 50,50 0 0 0 350,400 L 350,50 A 50,50 0 0 0 300,0 L 160,0 A 30,30 0 0 0 130,30 L 130,30 A 20,20 0 0 1 110,50 L 20,50 A 20,20 0 0 0 0,70 Z")`,
        }}
      >
        {/* Card Content */}
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-10">
          <Heading className={`${CalSans.className} font-black text-neutral-900 tracking-tight`}>
            {title}
          </Heading>
          <Paragraph className=" text-neutral-600 max-w-[290px] leading-tight">
            {description}
          </Paragraph>
          <div className="text-6xl text-gray-900 mt-4">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepsSection = () => {
  const steps = [
    { 
      number: '01', 
      title: 'Connect GitHub', 
      description: 'Sign up in seconds and link your GitHub account via OAuth.', 
      icon: <IconKey size={48} />
    },
    { 
      number: '02', 
      title: 'Complete Profile', 
      description: 'One-time setup. We auto-fill from GitHub, you add the rest. AI helps you craft the perfect resume summary.', 
      icon: <IconUserEdit size={48} /> 
    },
    { 
      number: '03', 
      title: 'Generate Resume', 
      description: 'You fine-tune every word with our built-in editor—bold, italic, restructure at will.', 
      icon: <IconFileCvFilled size={48} /> 
    },
  ];

  return (
      <Container className=" relative overflow-hidden border-l border-r border-stone-300 pb-15">

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
            <div className="text-center mb-16 relative overflow-hidden border-t border-b border-stone-600 py-8">
              <div className="absolute left-0 top-0 h-2 w-2 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none"></div>
              <Heading className={`${CalSans.className} font-black text-neutral-900 tracking-tight mb-2 text-balance`}>
                3 simple steps, you get hired.
              </Heading>
              <Paragraph className=" text-neutral-600 font-medium max-w-3xl mx-auto text-pretty">
                Follow these easy steps to create your professional resume from your GitHub repositories.
              </Paragraph>
            </div>
        </div>
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-12">
          {steps.map((step) => (
            <StepCard 
              key={step.number}
              stepNumber={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </Container>
  );
};

export default StepsSection;