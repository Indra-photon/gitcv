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
    <Container className="w-full px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Heading className="text-6xl font-black text-black tracking-tight mb-4 text-balance">
            Why Developers Choose Us
          </Heading>
          <Paragraph className="text-2xl text-gray-600 font-medium max-w-3xl mx-auto text-pretty">
            From GitHub repos to professional resumes in minutes. No more manual formatting or generic descriptions.
          </Paragraph>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          
          {/* Card 1 - GitHub Connect */}
          <GitHubConnectCard />

          {/* Card 2 - Statistics (Large - spans 2 columns) */}
          <StatisticsCard />

          {/* Card 3 - AI Generation Preview (Large - spans 2 columns on desktop) */}
          <AIGenerationCard />

          {/* Card 4 - Role Tailoring */}
          <RoleTailoringCard />

          {/* Card 5 - Tech Stack Detection */}
          {/* <TechStackCard /> */}

          {/* Card 6 - Export Options */}
          {/* <ExportCard /> */}

        </div>
      </div>
    </Container>
  );
};

// Card 1 - GitHub Connect
// const GitHubConnectCard = () => {
//   return (
//     <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
//       <div className="flex flex-col h-full">
//         <div className="size-12 bg-black rounded-2xl flex items-center justify-center mb-6">
//           <svg className="size-7 text-white" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//           </svg>
//         </div>
//         <Heading className="text-2xl mb-3 text-balance">
//           One-Click GitHub Sync
//         </Heading>
//         <Paragraph className="text-gray-600 text-pretty">
//           Connect your GitHub account and select repositories. No manual copy-pasting required.
//         </Paragraph>
//       </div>
//     </div>
//   );
// };

// Card 2 - Speed Stat (Hero card)
// const SpeedStatCard = () => {
//   return (
//     <div className="bg-gray-900 rounded-3xl p-8 md:col-span-2 border-2 border-gray-800 flex flex-col justify-center items-center text-center min-h-[300px]">
//       <div className="mb-4">
//         <div className="text-7xl font-bold text-white mb-2 tabular-nums">
//           10 Minutes
//         </div>
//         <Paragraph className="text-gray-300 text-xl text-balance">
//           From repos to interview-ready resume
//         </Paragraph>
//       </div>
      
//       <div className="flex items-center gap-4 mt-6">
//         <div className="flex flex-col items-end">
//           <Paragraph className="text-gray-400 text-sm">Traditional way</Paragraph>
//           <Paragraph className="text-gray-500 text-lg tabular-nums">2-3 hours</Paragraph>
//         </div>
//         <div className="text-green-400 text-2xl">→</div>
//         <div className="flex flex-col items-start">
//           <Paragraph className="text-gray-400 text-sm">With our tool</Paragraph>
//           <Paragraph className="text-green-400 text-lg font-bold tabular-nums">10 min</Paragraph>
//         </div>
//       </div>
//     </div>
//   );
// };

// Card 3 - AI Generation Preview
// const AIGenerationCard = () => {
//   return (
//     <div className="bg-white rounded-3xl p-8 md:col-span-2 border-2 border-gray-200 hover:border-gray-300 transition-colors">
//       <Heading className="text-2xl mb-6 text-balance">
//         AI Writes Your Bullet Points
//       </Heading>
      
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Before */}
//         <div className="space-y-3">
//           <div className="text-sm font-medium text-gray-500 uppercase">Before</div>
//           <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//             <Paragraph className="text-gray-600 text-sm font-mono text-pretty">
//               github.com/user/ecommerce-app
//             </Paragraph>
//             <Paragraph className="text-gray-400 text-xs mt-2">
//               README: "Full-stack e-commerce site"
//             </Paragraph>
//           </div>
//         </div>

//         {/* After */}
//         <div className="space-y-3">
//           <div className="text-sm font-medium text-green-600 uppercase">After AI</div>
//           <div className="bg-green-50 rounded-xl p-4 border border-green-200">
//             <Paragraph className="text-gray-800 text-sm leading-relaxed text-pretty">
//               • Developed full-stack e-commerce platform using React and Node.js to enable small businesses to sell products online
//             </Paragraph>
//             <Paragraph className="text-gray-800 text-sm leading-relaxed mt-2 text-pretty">
//               • Integrated Razorpay payment gateway to process transactions with webhook verification
//             </Paragraph>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Card 4 - Role Tailoring
// const RoleTailoringCard = () => {
//   const roles = [
//     { name: 'Frontend', color: 'bg-blue-100 text-blue-700' },
//     { name: 'Backend', color: 'bg-green-100 text-green-700' },
//     { name: 'Full-Stack', color: 'bg-purple-100 text-purple-700' }
//   ];

//   return (
//     <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
//       <div className="flex flex-col h-full">
//         <div className="size-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
//           <svg className="size-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         <Heading className="text-2xl mb-4 text-balance">
//           Role-Specific Resumes
//         </Heading>
//         <div className="space-y-2 mb-4">
//           {roles.map((role) => (
//             <div 
//               key={role.name}
//               className={cn("px-4 py-2 rounded-lg text-sm font-medium", role.color)}
//             >
//               {role.name} Developer
//             </div>
//           ))}
//         </div>
//         <Paragraph className="text-gray-600 text-sm mt-auto text-pretty">
//           Same projects, tailored for each role
//         </Paragraph>
//       </div>
//     </div>
//   );
// };

// Card 5 - Tech Stack Detection
const TechStackCard = () => {
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Python', icon: '🐍' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex flex-col h-full">
        <Heading className="text-2xl mb-4 text-balance">
          Auto-Detect Tech Stack
        </Heading>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {technologies.map((tech) => (
            <div 
              key={tech.name}
              className="aspect-square bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="text-2xl mb-1">{tech.icon}</span>
              <span className="text-xs text-gray-600 font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
        <Paragraph className="text-gray-600 text-sm text-pretty">
          We analyze your code to extract technologies automatically
        </Paragraph>
      </div>
    </div>
  );
};

// Card 6 - Export Options
const ExportCard = () => {
  const formats = [
    { name: 'PDF', icon: '📄' },
    { name: 'DOCX', icon: '📝' },
    { name: 'JSON', icon: '{ }' }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex flex-col h-full">
        <div className="size-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
          <svg className="size-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <Heading className="text-2xl mb-4 text-balance">
          Export Anywhere
        </Heading>
        <div className="flex gap-3 mb-4">
          {formats.map((format) => (
            <div 
              key={format.name}
              className="flex-1 aspect-square bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-200"
            >
              <span className="text-2xl mb-1">{format.icon}</span>
              <span className="text-xs text-gray-600 font-medium">{format.name}</span>
            </div>
          ))}
        </div>
        <Paragraph className="text-gray-600 text-sm text-pretty">
          ATS-friendly formats ready for job applications
        </Paragraph>
      </div>
    </div>
  );
};

export default BentoSection;