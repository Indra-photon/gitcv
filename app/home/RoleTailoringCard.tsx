// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { IconSettingsAutomation, IconUserEdit, IconPencil } from '@tabler/icons-react';

// const TAILOR_MESSAGES = [
//   { id: 1, text: "Role Specific", sub: "Matches Frontend, Backend, or Full-Stack focus" },
//   { id: 2, text: "JD Specific", sub: "Aligns with requirements in the job description" },
//   { id: 3, text: "Experience Based", sub: "Highlights your seniority and specific impact" }
// ];

// const RoleTailoringCard = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % TAILOR_MESSAGES.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="bg-[#fdfaf3] border-[3px] border-black rounded-[3rem] p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-between min-h-[500px] overflow-hidden">
      
//       {/* Top Section: Icon & Heading */}
//       <div className="text-center">
//         <div className="size-16 bg-black rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-[4px_4px_0px_0px_rgba(139,69,19,1)]">
//           <IconSettingsAutomation className="text-white size-10" />
//         </div>
//         <h2 className="text-3xl font-black uppercase tracking-tight">Tailored Intelligence</h2>
//       </div>

//       {/* Center Section: 3D Y-Axis Scrolling Text */}
//       <div className="relative h-40 w-full flex flex-col items-center justify-center">
//         {/* Fading Gradients to create the 'behind' effect */}
//         <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-[#fdfaf3] to-transparent z-10" />
//         <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#fdfaf3] to-transparent z-10" />

//         <AnimatePresence mode="popLayout">
//           <motion.div
//             key={index}
//             initial={{ y: 60, opacity: 0, scale: 0.8, rotateX: -45 }}
//             animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
//             exit={{ y: -60, opacity: 0, scale: 0.8, rotateX: 45 }}
//             transition={{ duration: 0.6, ease: "backOut" }}
//             className="text-center"
//           >
//             <h3 className="text-4xl font-black text-[#8B4513] mb-2 leading-none">
//               {TAILOR_MESSAGES[index].text}
//             </h3>
//             <p className="text-gray-500 font-medium text-sm">
//               {TAILOR_MESSAGES[index].sub}
//             </p>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Bottom Section: Human Control Message */}
//       <div className="w-full bg-white border-[3px] border-black rounded-2xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//         <div className="bg-green-100 p-2 rounded-lg border border-black">
//           <IconUserEdit className="text-green-700" size={24} />
//         </div>
//         <div>
//           <p className="text-xs font-black uppercase text-gray-400 leading-none mb-1">Final Stage</p>
//           <p className="text-sm font-bold text-black">
//             Full control to edit. AI drafts, <span className="underline decoration-[#8B4513] decoration-2">you finalize.</span>
//           </p>
//         </div>
//         <motion.div 
//           animate={{ y: [0, -4, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           className="ml-auto"
//         >
//           <IconPencil size={20} className="text-[#8B4513]" />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default RoleTailoringCard;

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { Button } from '@/components/ui/button';
import {IconArrowNarrowRightDashed} from '@tabler/icons-react';

const TAILOR_MESSAGES = [
  { id: 1, text: "Role Specific", sub: "Matches Frontend, Backend, or Full-Stack focus" },
  { id: 2, text: "JD Specific", sub: "Aligns with requirements in the job description" },
  { id: 3, text: "Experience Based", sub: "Highlights your seniority and specific impact" }
];

const RoleTailoringCard = () => {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TAILOR_MESSAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-between min-h-[550px] overflow-hidden">
        
        {/* Top Section: Icon & Heading */}
        <div className="text-center">
          <div className="size-16 bg-black rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <svg className="text-white size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <SubHeading className="text-3xl text-neutral-500 font-black tracking-tight">Tailored Intelligence</SubHeading>
        </div>

        {/* Center Section: 3D Y-Axis Scrolling Text */}
        <div className="relative h-40 w-full flex flex-col items-center justify-center">
          {/* Fading Gradients to create the 'behind' effect */}
          <div className="absolute top-0 w-full h-12  z-10 pointer-events-none" />
          <div className="absolute bottom-0 w-full h-12  z-10 pointer-events-none" />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              initial={shouldReduceMotion ? { opacity: 0 } : { y: 60, opacity: 0, scale: 0.8, rotateX: -45 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1, rotateX: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: -60, opacity: 0, scale: 0.8, rotateX: 45 }}
              transition={{ duration: 0.6, ease: shouldReduceMotion ? 'linear' : [0.34, 1.56, 0.64, 1] }}
              className="text-center"
            >
              <SubHeading className="text-4xl font-black text-neutral-900 mb-2 leading-none">
                {TAILOR_MESSAGES[index].text}
              </SubHeading>
              <Paragraph className="text-neutral-600 font-medium text-sm">
                {TAILOR_MESSAGES[index].sub}
              </Paragraph>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section: Human Control Message */}
        <div className="w-full bg-white border-[3px] border-black rounded-2xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-green-100 p-2 rounded-lg border border-black">
            <svg className="text-green-700 size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-black uppercase text-gray-400 leading-none mb-1">Final Stage</p>
            <p className="text-sm font-bold text-black">
              Full control to edit. AI drafts, <span className="underline decoration-[#8B4513] decoration-2">you finalize.</span>
            </p>
          </div>
          <motion.div 
            animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
            transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="ml-auto"
          >
            <svg className="text-[#8B4513] size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* CTA Button */}
        <Button size="lg" className='w-full max-w-md text-2xl font-bold tracking-tighter flex items-center justify-center pb-1'>
          Create Your Resume
          <span className=' flex items-center justify-center'><IconArrowNarrowRightDashed className="size-6 ml-2" /></span>
        </Button>
    </div>
  );
};

export default RoleTailoringCard;