


// import Image from 'next/image';
// import { Heading } from '@/components/Heading';
// import { SubHeading } from '@/components/SubHeading';
// import { Paragraph } from '@/components/Paragraph';
// import { Container } from '@/components/Container';
// import { ResumeIllustration } from './ResumeIllustration';

// const HeroComponent = () => {
//   // Pexels Image URLs
// //   const imageTop = "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg";
//   const imageTop = "./hero1.png";
//   const imageBottom = "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg";

//   return (
//     <Container className="relative w-full min-h-dvh flex items-center justify-center px-8 py-20 overflow-hidden">
//       <div className=" w-full grid grid-cols-1 lg:grid-cols-1 gap-16 items-center relative">

        
       
//         <div className="flex flex-col space-y-8 z-20">
//           <Heading className="text-gray-900 leading-tighter tracking-tight text-balance text-6xl! font-thin">
//             Create <span className="text-black italic">Resume</span> from Your GitHub in Minutes
//           </Heading>
          
//           <SubHeading className="text-gray-700 text-pretty text-xl! font-semibold">
//             You don't spend hours crafting resumes to apply for jobs, bootcamps, or internships. Why should we?
//           </SubHeading>

//           <div className='flex flex-row gap-4'>
//           <Paragraph className="inline-block self-start px-6 py-2 bg-gray-100 rounded-xl text-sm text-gray-600 font-normal">
//             For CS Students &  Developers
//           </Paragraph>

//           <button className="self-start px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-lg font-medium">
//             Start Building Your Resume
//           </button>
//           </div>
//         </div>

       
//         <div className="relative flex items-center justify-center" style={{ perspective: '2000px' }}>
//           {/* <div 
//             className="relative w-[500px] h-[650px]" 
//             style={{ transformStyle: 'preserve-3d' }}
//           >
            
            
//             <div 
//               className="absolute top-0 left-0 h-[400px] w-[600px] rounded-[3rem] overflow-hidden border-[3px] border-black shadow-2xl transition-transform duration-500 hover:scale-105"
//               style={{
//                 transform: 'rotateY(-30deg) rotateX(5deg) translateZ(100px)',
//                 WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
//                 maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
//               }}
//             >
//               <Image 
//                 src='/hero1.png' 
//                 alt="Top Landscape" 
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>

            
//             <div 
//               className="absolute bottom-0 right-[-40px] h-[400px] w-[600px] rounded-[3rem] overflow-hidden border-[3px] border-black shadow-2xl transition-transform duration-500 hover:scale-105"
//               style={{
//                 transform: 'rotateY(-30deg) rotateX(5deg) translateZ(100px)',
//                 WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
//                 maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
//               }}
//             >
//               <Image 
//                 src='/hero2.png'
//                 alt="Bottom Landscape" 
//                 fill
//                 className="object-cover"
//               />
//             </div>

//           </div> */}
//           <ResumeIllustration />
//         </div>

//       </div>
//     </Container>
//   );
// };

// export default HeroComponent;

'use client';

import { ResumeIllustration } from "./ResumeIllustration";
import { useUser } from '@clerk/nextjs';  // ADD THIS
import { useRouter } from 'next/navigation';  // ADD THIS
import { ArrowRight, Loader2 } from 'lucide-react';  // ADD THIS
import { useState } from 'react';  // ADD THIS
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";

const HeroComponent = () => {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleGetStarted = () => {
    setIsNavigating(true)
    
    if (isSignedIn) {
      router.push('/dashboard')
    } else {
      router.push('/sign-in')
    }
  }
  return (
    <Container className="relative w-full min-h-dvh flex flex-col px-6 md:px-12 lg:px-16 overflow-hidden bg-stone-50 border-l border-r border-stone-200">
      {/* Top section - Text content */}
      <div className="w-full max-w-5xl mx-auto text-center mb-8 flex-shrink-0 ">
        <h1 className="text-neutral-800 leading-tight tracking-tight text-balance text-5xl md:text-5xl lg:text-7xl font-light mb-1 pt-36">
          Create Tailored <span className="text-stone-800 font-bold">Resume</span> Fast
        </h1>
        <div className="mb-12">
          <h2 className="text-stone-800 font-sans text-xl md:text-2xl lg:text-3xl">AI creates the copy. You add the polish.</h2>
        </div>

        {/* <p className="text-stone-600 text-pretty text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto">
          You don{"'"}t spend hours crafting resumes to apply for jobs, bootcamps, or internships. Why should we?
        </p> */}

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <div className="inline-block px-5 py-2.5 bg-stone-100 rounded-full text-sm text-stone-600 font-medium border border-stone-200">
            For CS Students & Developers
          </div>

          {/* <button className="px-6 py-2.5 bg-stone-900 text-stone-50 rounded-full hover:bg-stone-800 transition-colors text-base font-medium">
            Start Building Your Resume
          </button> */}
          <button 
            onClick={handleGetStarted}
            disabled={!isLoaded || isNavigating}
            className="self-start px-6 py-2.5 bg-stone-900 text-stone-50 rounded-full hover:bg-stone-800 transition-colors text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isNavigating ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Start Building Your Resume
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom section - Large Illustration */}
      <div className="flex-1 w-full flex items-center justify-center min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
        <div
          className="w-full max-w-6xl"
          style={{ perspective: "1500px" }}
        >
          <div
            style={{
              transform: "rotateX(6deg) rotateY(-4deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <ResumeIllustration />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroComponent;
