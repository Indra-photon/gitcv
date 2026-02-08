// // import React from 'react'

// // function FeaturesComponent() {
// //   return (
// //     <div>FeaturesComponent</div>
// //   )
// // }

// // export default FeaturesComponent


// 'use client';

// import React from 'react';
// import localFont from "next/font/local";
// import { 
//   IconBrandGithub, 
//   IconSparkles, 
//   IconBriefcase, 
//   IconEdit, 
//   IconFileDownload,
//   IconArrowRight 
// } from '@tabler/icons-react';
// import { Heading } from '@/components/Heading';
// import { Paragraph } from '@/components/Paragraph';
// import { Container } from '@/components/Container';
// import { cn } from '@/lib/utils';

// const CalSans = localFont({
//   src: [{ path: "../../fonts/CalSans-SemiBold.woff2" }],
//   display: "swap",
// });

// interface GridCellProps {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   accent?: boolean;
//   className?: string;
// }

// const GridCell = ({ title, description, icon, accent = false, className }: GridCellProps) => {
//   return (
//     <div
//       className={cn(
//         "relative border border-stone-900 bg-stone-50 p-8 transition-all hover:bg-stone-100",
//         accent && "bg-neutral-900 text-white hover:bg-neutral-800",
//         className
//       )}
//     >
//       <div className="flex flex-col gap-4 h-full">
//         <div className={cn(
//           "size-12 flex items-center justify-center",
//           accent ? "text-white" : "text-neutral-900"
//         )}>
//           {icon}
//         </div>
//         <Heading 
//           className={cn(
//             CalSans.className,
//             "text-3xl font-black tracking-tight text-balance",
//             accent ? "text-white" : "text-neutral-900"
//           )}
//         >
//           {title}
//         </Heading>
//         <Paragraph 
//           className={cn(
//             "text-lg leading-relaxed text-pretty",
//             accent ? "text-stone-300" : "text-neutral-600"
//           )}
//         >
//           {description}
//         </Paragraph>
//       </div>
//     </div>
//   );
// };

// const FeaturesComponent = () => {
//   return (
//     <Container className="relative overflow-hidden border-l border-r border-stone-300">
//       <div className="w-full relative">
//         {/* Dashed Grid Background */}
//         <div
//           className="absolute inset-0 z-0"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, #e7e5e4 1px, transparent 1px),
//               linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
//             `,
//             backgroundSize: "20px 20px",
//             backgroundPosition: "0 0, 0 0",
//             maskImage: `
//               repeating-linear-gradient(
//                 to right,
//                 black 0px,
//                 black 3px,
//                 transparent 3px,
//                 transparent 8px
//               ),
//               repeating-linear-gradient(
//                 to bottom,
//                 black 0px,
//                 black 3px,
//                 transparent 3px,
//                 transparent 8px
//               )
//             `,
//             WebkitMaskImage: `
//               repeating-linear-gradient(
//                 to right,
//                 black 0px,
//                 black 3px,
//                 transparent 3px,
//                 transparent 8px
//               ),
//               repeating-linear-gradient(
//                 to bottom,
//                 black 0px,
//                 black 3px,
//                 transparent 3px,
//                 transparent 8px
//               )
//             `,
//             maskComposite: "intersect",
//             WebkitMaskComposite: "source-in",
//           }}
//         />

//         {/* Section Header */}
//         <div className="text-center mb-16 relative overflow-hidden border-t border-b border-stone-600 py-8">
//           <Heading 
//             className={cn(
//               CalSans.className,
//               "text-6xl font-black text-neutral-900 tracking-tight mb-2 text-balance"
//             )}
//           >
//             Why we're different.
//           </Heading>
//           <Paragraph className="text-2xl text-neutral-600 font-medium max-w-3xl mx-auto text-pretty">
//             Traditional resume builders waste your time. We built something smarter.
//           </Paragraph>
//         </div>

//         {/* Responsive Grid - Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
//         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
//           {/* Cell 1 - Spans 2 columns on md+ */}
//           <GridCell
//             title="Sync Once, Use Forever"
//             description="Connect your GitHub once. Every repo, commit, and contribution automatically syncs to your profile—ready whenever you need it."
//             icon={<IconBrandGithub size={48} stroke={1.5} />}
//             className="md:col-span-2 lg:col-span-1"
//           />

//           {/* Cell 2 */}
//           <GridCell
//             title="Job-Matched in Seconds"
//             description="Upload any job description. Our AI instantly tailors your resume to match requirements, keywords, and experience level."
//             icon={<IconSparkles size={48} stroke={1.5} />}
//           />

//           {/* Cell 3 */}
//           <GridCell
//             title="Smart Positioning"
//             description="Target senior, mid-level, or junior roles. We auto-adjust your resume's tone, depth, and focus based on years of experience."
//             icon={<IconBriefcase size={48} stroke={1.5} />}
//           />

//           {/* Cell 4 */}
//           <GridCell
//             title="AI Speed, Human Control"
//             description="Get a polished resume in 5 minutes. Then fine-tune every word with our built-in editor—bold, italic, restructure at will."
//             icon={<IconEdit size={48} stroke={1.5} />}
//           />

//           {/* Cell 5 - Spans 2 columns on md+, positioned at bottom right on lg */}
//           <GridCell
//             title="Export & Deploy"
//             description="One click to professional PDF. Download and send immediately—no formatting nightmares, no layout breaks."
//             icon={<IconFileDownload size={48} stroke={1.5} />}
//             className="md:col-span-2 lg:col-span-1"
//           />

//           {/* Cell 6 - CTA Cell - Accent style, spans remaining space */}
//           <div className="relative border border-stone-900 bg-neutral-900 text-white p-8 flex flex-col items-center justify-center text-center gap-6 md:col-span-2 lg:col-span-1 transition-all hover:bg-neutral-800">
//             <Heading 
//               className={cn(
//                 CalSans.className,
//                 "text-4xl font-black tracking-tight text-balance text-white"
//               )}
//             >
//               Stop rewriting resumes from scratch.
//             </Heading>
//             <Paragraph className="text-xl text-stone-300 text-pretty max-w-sm">
//               Start landing interviews.
//             </Paragraph>
//             <button 
//               className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-4 font-bold text-lg transition-all hover:bg-stone-100 border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
//               aria-label="Create your resume now"
//             >
//               Create Your Resume
//               <IconArrowRight size={20} stroke={2.5} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default FeaturesComponent;


'use client';

import React from 'react';
import localFont from "next/font/local";
import { 
  IconBrandGithub, 
  IconSparkles, 
  IconBriefcase, 
  IconEdit, 
  IconFileDownload,
  IconArrowRight 
} from '@tabler/icons-react';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { cn } from '@/lib/utils';
import { SubHeading } from '@/components/SubHeading';

const CalSans = localFont({
  src: [{ path: "../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
});

interface GridCellProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent?: boolean;
  featured?: boolean;
  className?: string;
}

const GridCell = ({ title, description, icon, accent = false, featured = false, className }: GridCellProps) => {
  return (
    <div
      className={cn(
        "relative border border-stone-200 bg-stone-50 p-8 transition-all hover:bg-stone-100",
        accent && "bg-neutral-900 text-white hover:bg-neutral-800",
        featured && "p-12",
        className
      )}
    >
      <div className="flex flex-col gap-4 h-full">
        <div className={cn(
          "flex items-center justify-center",
          featured ? "size-16" : "size-12",
          accent ? "text-white" : "text-neutral-900"
        )}>
          {icon}
        </div>
        <Heading 
          className={cn(
            CalSans.className,
            "font-black tracking-tight text-balance",
            featured ? "text-4xl" : "",
            accent ? "text-white" : "text-neutral-900"
          )}
        >
          {title}
        </Heading>
        <Paragraph 
          className={cn(
            "leading-relaxed text-pretty",
            featured ? "text-xl" : "",
            accent ? "text-stone-300" : "text-neutral-600"
          )}
        >
          {description}
        </Paragraph>
      </div>
    </div>
  );
};

const DifferenceSection = () => {
  return (
    <Container className="relative overflow-hidden border-l border-r border-stone-300">
      <div className="w-full relative">

        {/* Section Header */}
        <div className="text-center mb-16 relative overflow-hidden border-t border-b border-stone-600 pt-8 pb-8">
            {/* Dashed Grid Background */}
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

        <div className="relative z-10">
          <Heading 
            className={cn(
              CalSans.className,
              "font-black text-neutral-900 tracking-tight mb-2 text-balance"
            )}
          >
            Why we're different.
          </Heading>
          <Paragraph className=" text-neutral-600 font-medium max-w-3xl mx-auto text-pretty">
            Traditional resume builders waste your time. We built something smarter.
          </Paragraph>
          </div>
        </div>

        {/* Asymmetric Responsive Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-0">
          {/* Cell 1 - Featured "Sync Once" - Spans 2 rows on mobile, 2 cols on md, 1 col + 2 rows on lg */}
          <GridCell
            title="Sync Once, Use Forever"
            description="Connect your GitHub once. Every repo, commit, and contribution automatically syncs to your profile—ready whenever you need it."
            icon={<IconBrandGithub size={48} stroke={1.5} />}
            featured
            className="row-span-2 md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-2"
          />

          {/* Cell 2 - "Job-Matched" */}
          <GridCell
            title="Job-Matched in Seconds"
            description="Upload any job description. Our AI instantly tailors your resume to match requirements, keywords, and experience level."
            icon={<IconSparkles size={48} stroke={1.5} />}
          />

          {/* Cell 3 - "Smart Positioning" */}
          <GridCell
            title="Smart Positioning"
            description="Target senior, mid-level, or junior roles. We auto-adjust your resume's tone, depth, and focus based on years of experience."
            icon={<IconBriefcase size={48} stroke={1.5} />}
          />

          {/* Cell 4 - "AI Speed" - Standard on mobile/tablet, tall on desktop */}
          <GridCell
            title="AI Speed, Human Control"
            description="Get a polished resume in 5 minutes. Then fine-tune every word with our built-in editor—bold, italic, restructure at will."
            icon={<IconEdit size={48} stroke={1.5} />}
            // className="lg:row-span-2"
          />

          {/* Cell 5 - "Export" */}
          <GridCell
            title="Export & Deploy"
            description="One click to professional PDF. Download and send immediately—no formatting nightmares, no layout breaks."
            icon={<IconFileDownload size={48} stroke={1.5} />}
          />

          {/* Cell 6 - CTA - Spans 2 rows on mobile, 2 cols on md, 2 cols on lg */}
          <div className="row-span-2 md:col-span-2 lg:col-span-3 relative border border-stone-900 bg-neutral-900 text-white sm:p-12 flex flex-col items-center justify-center text-center gap-6 transition-all hover:bg-neutral-800">
            <Heading 
              className={cn(
                CalSans.className,
                "font-black tracking-tight text-balance text-white"
              )}
            >
              Stop rewriting resumes from scratch.
            </Heading>
            <SubHeading className=" text-stone-300 text-pretty max-w-md">
              Start landing interviews.
            </SubHeading>
            <button 
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-4 font-bold text-lg transition-all hover:bg-stone-100 border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              aria-label="Create your resume now"
            >
              Create Your Resume
              <IconArrowRight size={20} stroke={2.5} />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DifferenceSection;