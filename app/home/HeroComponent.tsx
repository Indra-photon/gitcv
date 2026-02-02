// import Image from 'next/image';

// const HeroComponent = () => {
//   // Pexels Image URLs
//   const imageTop = "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg";
//   const imageBottom = "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg";

//   return (
//     <section className="relative w-full min-h-screen flex items-center justify-center bg-[#fdfaf3] px-8 py-20 overflow-hidden">
//       <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
//         {/* Left Side: Content */}
//         <div className="flex flex-col space-y-8 z-20">
//           <div className="border-[3px] border-black rounded-[2rem] p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
//             <h1 className="text-7xl font-bold text-gray-900 leading-tight">
//               Heading
//             </h1>
//           </div>
          
//           <div className="border-[3px] border-black rounded-2xl p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
//             <p className="text-2xl text-gray-700 font-medium">
//               SubHeading
//             </p>
//           </div>

//           <div className="inline-block self-start border-[3px] border-black rounded-xl px-8 py-3 bg-white text-lg font-mono uppercase tracking-[0.2em] font-bold">
//             tooltip
//           </div>
//         </div>

//         {/* Right Side: 3D Rotated Images */}
//         <div className="relative flex items-center justify-center" style={{ perspective: '2000px' }}>
//           <div 
//             className="relative w-[500px] h-[650px]" 
//             style={{ transformStyle: 'preserve-3d' }}
//           >
            
//             {/* Top Image Container */}
//             <div 
//               className="absolute top-0 left-0 w-full h-[400px] rounded-[3rem] overflow-hidden border-[3px] border-black shadow-2xl transition-transform duration-500 hover:scale-105"
//               style={{
//                 transform: 'rotateY(-30deg) rotateX(5deg) translateZ(100px)',
//                 WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
//                 maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
//               }}
//             >
//               <Image 
//                 src={imageTop} 
//                 alt="Top Landscape" 
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>

//             {/* Bottom Image Container */}
//             <div 
//               className="absolute bottom-0 right-[-40px] w-full h-[400px] rounded-[3rem] overflow-hidden border-[3px] border-black shadow-2xl transition-transform duration-500 hover:scale-105"
//               style={{
//                 transform: 'rotateY(-30deg) rotateX(5deg) translateZ(0px)',
//                 WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
//                 maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
//               }}
//             >
//               <Image 
//                 src={imageBottom} 
//                 alt="Bottom Landscape" 
//                 fill
//                 className="object-cover"
//               />
//             </div>

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default HeroComponent;


import Image from 'next/image';
import { Heading } from '@/components/Heading';
import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';

const HeroComponent = () => {
  // Pexels Image URLs
//   const imageTop = "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg";
  const imageTop = "./hero1.png";
  const imageBottom = "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg";

  return (
    <Container className="relative w-full min-h-dvh flex items-center justify-center px-8 py-20 overflow-hidden">
      <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">

        
        {/* Left Side: Content */}
        <div className="flex flex-col space-y-8 z-20">
          <Heading className="text-gray-900 leading-tighter tracking-tight text-balance text-6xl! font-thin">
            Create <span className="text-black italic">Resume</span> from Your GitHub in Minutes
          </Heading>
          
          <SubHeading className="text-gray-700 text-pretty text-xl! font-semibold">
            You don't spend hours crafting resumes to apply for jobs, bootcamps, or internships. Why should we?
          </SubHeading>

          <div className='flex flex-row gap-4'>
          <Paragraph className="inline-block self-start px-6 py-2 bg-gray-100 rounded-xl text-sm text-gray-600 font-normal">
            For CS Students &  Developers
          </Paragraph>

          <button className="self-start px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-lg font-medium">
            Start Building Your Resume
          </button>
          </div>
        </div>

        {/* Right Side: 3D Rotated Images */}
        <div className="relative flex items-center justify-center" style={{ perspective: '2000px' }}>
          <div 
            className="relative w-[500px] h-[650px]" 
            style={{ transformStyle: 'preserve-3d' }}
          >
            
            {/* Top Image Container */}
            <div 
              className="absolute top-0 left-0 h-[400px] w-[600px] rounded-[3rem] overflow-hidden border-[3px] border-black shadow-2xl transition-transform duration-500 hover:scale-105"
              style={{
                transform: 'rotateY(-30deg) rotateX(5deg) translateZ(100px)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              <Image 
                src='/hero1.png' 
                alt="Top Landscape" 
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Bottom Image Container */}
            <div 
              className="absolute bottom-0 right-[-40px] h-[400px] w-[600px] rounded-[3rem] overflow-hidden border-[3px] border-black shadow-2xl transition-transform duration-500 hover:scale-105"
              style={{
                transform: 'rotateY(-30deg) rotateX(5deg) translateZ(100px)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              <Image 
                src='/hero2.png'
                alt="Bottom Landscape" 
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </Container>
  );
};

export default HeroComponent;