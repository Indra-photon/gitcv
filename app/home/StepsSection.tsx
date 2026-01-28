// import React from 'react';
// import { IconKey, IconDeviceFloppy, IconBrandGithub, IconFileDownload } from '@tabler/icons-react';

// interface StepCardProps {
//   stepNumber: string;
//   title: string;
//   description: string;
//   icon?: React.ReactNode;
// }

// const StepCard = ({ stepNumber, title, description, icon }: StepCardProps) => {
//   return (
//     <div className="relative w-full max-w-[350px] group">
//       {/* 1. The Brown Badge - Positioned to sit in the "cut-out" */}
//       <div className="absolute top-4 left-3 z-20">
//   <div 
//     className="bg-[#8B4513] text-white font-bold text-xl"
//     style={{
//       width: '110px',
//       height: '50px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       clipPath: 'inset(0 round 24px 0px 18px 0px)',
//     }}
//   >
//     {stepNumber}
//   </div>
// </div>

//       {/* 2. The Main Card with the specific Clip-Path Notch */}
//       <div 
//         className="relative mt-6 w-full min-h-[450px] bg-neutral-400 rounded-[3rem] p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
//         style={{
//         // Depth reduced to 50, Length extended, and added a 20px radius to the left corner
//         clipPath: `path("M 0,70 L 0,400 A 50,50 0 0 0 50,450 L 300,450 A 50,50 0 0 0 350,400 L 350,50 A 50,50 0 0 0 300,0 L 160,0 A 30,30 0 0 0 130,30 L 130,30 A 20,20 0 0 1 110,50 L 20,50 A 20,20 0 0 0 0,70 Z")`,
//         }}
//       >
//         {/* Step Number Hint (Muted next to badge) */}
//         {/* <div className="absolute top-8 left-32">
//           <span className="text-gray-400 font-bold">— {stepNumber}</span>
//         </div> */}

//         {/* Card Content */}
//         <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-10">
//           <h3 className="text-5xl font-black text-black tracking-tight">
//             {title}
//           </h3>
//           <p className="text-xl text-gray-500 font-medium max-w-[220px] leading-relaxed">
//             {description}
//           </p>
//           <div className="text-6xl text-gray-900 mt-4">
//             {icon}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StepsSection = () => {
//   const steps = [
//     { number: '01', title: 'Signup', description: 'Create your account to get started.', icon: <IconKey size={48} /> },
//     { number: '02', title: 'Save your profile', description: 'Fill in your details and preferences.', icon: <IconDeviceFloppy size={48} /> },
//     { number: '03', title: 'Generate resume', description: 'Select your repo and generate resume.', icon: <IconBrandGithub size={48} /> },
//   ];

//   return (
//     <section className="bg-[#fdfaf3] py-24 px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {steps.map((step) => (
//             <StepCard 
//               key={step.number}
//               stepNumber={step.number}
//               title={step.title}
//               description={step.description}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StepsSection;

import React from 'react';
import localFont from "next/font/local";
import { IconKey, IconUserEdit, IconSparkles } from '@tabler/icons-react';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';

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
        className="relative mt-6 w-full min-h-[450px] bg-linear-to-b from-neutral-200 via-neutral-300 to-neutral-400 rounded-[3rem] p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
        style={{
          // Depth reduced to 50, Length extended, and added a 20px radius to the left corner
          clipPath: `path("M 0,70 L 0,400 A 50,50 0 0 0 50,450 L 300,450 A 50,50 0 0 0 350,400 L 350,50 A 50,50 0 0 0 300,0 L 160,0 A 30,30 0 0 0 130,30 L 130,30 A 20,20 0 0 1 110,50 L 20,50 A 20,20 0 0 0 0,70 Z")`,
        }}
      >
        {/* Card Content */}
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-10">
          <h3 className={`${CalSans.className} text-5xl font-black text-black tracking-tight`}>
            {title}
          </h3>
          <p className="text-xl text-neutral-800 font-regular max-w-[220px] leading-tight">
            {description}
          </p>
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
      description: 'One-time setup. We auto-fill from GitHub, you add the rest.', 
      icon: <IconUserEdit size={48} /> 
    },
    { 
      number: '03', 
      title: 'Generate Resume', 
      description: 'Select repos and let AI transform your code into professional content.', 
      icon: <IconSparkles size={48} /> 
    },
  ];

  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute left-0 top-0 h-2 w-2 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none"></div>
          <Heading className={`${CalSans.className} text-6xl font-black text-black tracking-tight mb-4 text-balance`}>
            From GitHub to Resume in Minutes
          </Heading>
          <Paragraph className="text-2xl text-gray-600 font-medium max-w-3xl mx-auto text-pretty">
            Transform your repositories into a polished, role-specific resume in just 10-15 minutes instead of hours of manual work.
          </Paragraph>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
      </div>
    </section>
  );
};

export default StepsSection;