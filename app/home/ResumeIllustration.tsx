// "use client"

// export function ResumeIllustration() {
//   return (
//     <div 
//       className="w-full max-w-5xl"
//       style={{ 
//         perspective: "1200px",
//       }}
//     >
//       <svg
//         viewBox="0 0 900 550"
//         className="w-full h-auto"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{
//           transform: "rotateX(8deg) rotateY(-6deg)",
//           transformStyle: "preserve-3d",
//         }}
//       >
//         <defs>
//           {/* Main processor gradients */}
//           <linearGradient id="processorTop" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#f5f5f4" />
//             <stop offset="100%" stopColor="#e7e5e4" />
//           </linearGradient>
//           <linearGradient id="processorLeft" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#a8a29e" />
//             <stop offset="100%" stopColor="#d6d3d1" />
//           </linearGradient>
//           <linearGradient id="processorRight" x1="100%" y1="0%" x2="0%" y2="0%">
//             <stop offset="0%" stopColor="#78716c" />
//             <stop offset="100%" stopColor="#a8a29e" />
//           </linearGradient>
//           <linearGradient id="processorFront" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#fafaf9" />
//             <stop offset="100%" stopColor="#e7e5e4" />
//           </linearGradient>
          
//           {/* Repo card gradients */}
//           <linearGradient id="repoFront" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#fafaf9" />
//             <stop offset="100%" stopColor="#f5f5f4" />
//           </linearGradient>
//           <linearGradient id="repoSide" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#d6d3d1" />
//             <stop offset="100%" stopColor="#a8a29e" />
//           </linearGradient>
//           <linearGradient id="repoBottom" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#d6d3d1" />
//             <stop offset="100%" stopColor="#a8a29e" />
//           </linearGradient>

//           {/* Document gradient */}
//           <linearGradient id="docFront" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#fafaf9" />
//             <stop offset="100%" stopColor="#f5f5f4" />
//           </linearGradient>
//           <linearGradient id="docSide" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#e7e5e4" />
//             <stop offset="100%" stopColor="#d6d3d1" />
//           </linearGradient>
//           <linearGradient id="docBottom" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#d6d3d1" />
//             <stop offset="100%" stopColor="#a8a29e" />
//           </linearGradient>

//           {/* Job description gradient */}
//           <linearGradient id="jobFront" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#e7e5e4" />
//             <stop offset="100%" stopColor="#d6d3d1" />
//           </linearGradient>

//           {/* Arrow gradient */}
//           <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#a8a29e" />
//             <stop offset="100%" stopColor="#78716c" />
//           </linearGradient>

//           {/* Screen gradient */}
//           <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#44403c" />
//             <stop offset="100%" stopColor="#292524" />
//           </linearGradient>

//           {/* Shadow */}
//           <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
//             <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#1c1917" floodOpacity="0.15"/>
//           </filter>
//           <filter id="shadowLg" x="-20%" y="-20%" width="140%" height="140%">
//             <feDropShadow dx="4" dy="6" stdDeviation="10" floodColor="#1c1917" floodOpacity="0.2"/>
//           </filter>
//         </defs>

//         {/* GitHub Repo 1 - Contact */}
//         <g filter="url(#shadow)">
//           <rect x="30" y="50" width="110" height="65" rx="4" fill="url(#repoFront)" />
//           <polygon points="30,50 30,115 22,122 22,57" fill="url(#repoSide)" />
//           <polygon points="30,115 140,115 132,122 22,122" fill="url(#repoBottom)" />
          
//           <circle cx="48" cy="68" r="9" fill="#44403c" />
//           <path d="M48,61 C44.1,61 41,64.1 41,68 C41,71.1 43,73.6 45.7,74.5 C46,74.6 46.1,74.3 46.1,74.1 L46.1,72.9 C44.2,73.3 43.9,72 43.9,72 C43.6,71.2 43.1,71 43.1,71 C42.5,70.6 43.1,70.6 43.1,70.6 C43.8,70.7 44.1,71.3 44.1,71.3 C44.7,72.3 45.7,72 46.1,71.8 C46.2,71.4 46.4,71 46.5,70.9 C45,70.7 43.4,70.1 43.4,67.5 C43.4,66.7 43.7,66.1 44.1,65.6 C44,65.4 43.7,64.7 44.2,63.8 C44.2,63.8 44.8,63.6 46.1,64.5 C46.6,64.3 47.2,64.3 47.8,64.3 C48.4,64.3 49,64.4 49.5,64.5 C50.8,63.6 51.4,63.8 51.4,63.8 C51.9,64.7 51.6,65.4 51.5,65.6 C51.9,66.1 52.2,66.7 52.2,67.5 C52.2,70.1 50.6,70.7 49.1,70.9 C49.3,71.1 49.5,71.5 49.5,72.1 L49.5,74.1 C49.5,74.3 49.6,74.6 50,74.5 C52.7,73.6 54.7,71.1 54.7,68 C54.7,64.1 51.6,61 48,61" fill="#fafaf9" />
          
//           <text x="62" y="71" fill="#44403c" fontSize="9" fontWeight="600" fontFamily="system-ui">contact-info</text>
//           <rect x="48" y="82" width="80" height="4" rx="1" fill="#d6d3d1" />
//           <rect x="48" y="90" width="55" height="4" rx="1" fill="#d6d3d1" />
//           <text x="52" y="107" fill="#78716c" fontSize="7" fontFamily="system-ui">128</text>
//         </g>

//         {/* GitHub Repo 2 - Skills */}
//         <g filter="url(#shadow)">
//           <rect x="30" y="135" width="110" height="65" rx="4" fill="url(#repoFront)" />
//           <polygon points="30,135 30,200 22,207 22,142" fill="url(#repoSide)" />
//           <polygon points="30,200 140,200 132,207 22,207" fill="url(#repoBottom)" />
          
//           <circle cx="48" cy="153" r="9" fill="#44403c" />
//           <path d="M48,146 C44.1,146 41,149.1 41,153 C41,156.1 43,158.6 45.7,159.5 C46,159.6 46.1,159.3 46.1,159.1 L46.1,157.9 C44.2,158.3 43.9,157 43.9,157 C43.6,156.2 43.1,156 43.1,156 C42.5,155.6 43.1,155.6 43.1,155.6 C43.8,155.7 44.1,156.3 44.1,156.3 C44.7,157.3 45.7,157 46.1,156.8 C46.2,156.4 46.4,156 46.5,155.9 C45,155.7 43.4,155.1 43.4,152.5 C43.4,151.7 43.7,151.1 44.1,150.6 C44,150.4 43.7,149.7 44.2,148.8 C44.2,148.8 44.8,148.6 46.1,149.5 C46.6,149.3 47.2,149.3 47.8,149.3 C48.4,149.3 49,149.4 49.5,149.5 C50.8,148.6 51.4,148.8 51.4,148.8 C51.9,149.7 51.6,150.4 51.5,150.6 C51.9,151.1 52.2,151.7 52.2,152.5 C52.2,155.1 50.6,155.7 49.1,155.9 C49.3,156.1 49.5,156.5 49.5,157.1 L49.5,159.1 C49.5,159.3 49.6,159.6 50,159.5 C52.7,158.6 54.7,156.1 54.7,153 C54.7,149.1 51.6,146 48,146" fill="#fafaf9" />
          
//           <text x="62" y="156" fill="#44403c" fontSize="9" fontWeight="600" fontFamily="system-ui">skills-stack</text>
//           <rect x="48" y="167" width="75" height="4" rx="1" fill="#d6d3d1" />
//           <rect x="48" y="175" width="60" height="4" rx="1" fill="#d6d3d1" />
//           <text x="52" y="192" fill="#78716c" fontSize="7" fontFamily="system-ui">256</text>
//         </g>

//         {/* GitHub Repo 3 - Experience */}
//         <g filter="url(#shadow)">
//           <rect x="30" y="220" width="110" height="65" rx="4" fill="url(#repoFront)" />
//           <polygon points="30,220 30,285 22,292 22,227" fill="url(#repoSide)" />
//           <polygon points="30,285 140,285 132,292 22,292" fill="url(#repoBottom)" />
          
//           <circle cx="48" cy="238" r="9" fill="#44403c" />
//           <path d="M48,231 C44.1,231 41,234.1 41,238 C41,241.1 43,243.6 45.7,244.5 C46,244.6 46.1,244.3 46.1,244.1 L46.1,242.9 C44.2,243.3 43.9,242 43.9,242 C43.6,241.2 43.1,241 43.1,241 C42.5,240.6 43.1,240.6 43.1,240.6 C43.8,240.7 44.1,241.3 44.1,241.3 C44.7,242.3 45.7,242 46.1,241.8 C46.2,241.4 46.4,241 46.5,240.9 C45,240.7 43.4,240.1 43.4,237.5 C43.4,236.7 43.7,236.1 44.1,235.6 C44,235.4 43.7,234.7 44.2,233.8 C44.2,233.8 44.8,233.6 46.1,234.5 C46.6,234.3 47.2,234.3 47.8,234.3 C48.4,234.3 49,234.4 49.5,234.5 C50.8,233.6 51.4,233.8 51.4,233.8 C51.9,234.7 51.6,235.4 51.5,235.6 C51.9,236.1 52.2,236.7 52.2,237.5 C52.2,240.1 50.6,240.7 49.1,240.9 C49.3,241.1 49.5,241.5 49.5,242.1 L49.5,244.1 C49.5,244.3 49.6,244.6 50,244.5 C52.7,243.6 54.7,241.1 54.7,238 C54.7,234.1 51.6,231 48,231" fill="#fafaf9" />
          
//           <text x="62" y="241" fill="#44403c" fontSize="9" fontWeight="600" fontFamily="system-ui">work-history</text>
//           <rect x="48" y="252" width="70" height="4" rx="1" fill="#d6d3d1" />
//           <rect x="48" y="260" width="58" height="4" rx="1" fill="#d6d3d1" />
//           <text x="52" y="277" fill="#78716c" fontSize="7" fontFamily="system-ui">512</text>
//         </g>

//         {/* GitHub Repo 4 - Education */}
//         <g filter="url(#shadow)">
//           <rect x="30" y="305" width="110" height="65" rx="4" fill="url(#repoFront)" />
//           <polygon points="30,305 30,370 22,377 22,312" fill="url(#repoSide)" />
//           <polygon points="30,370 140,370 132,377 22,377" fill="url(#repoBottom)" />
          
//           <circle cx="48" cy="323" r="9" fill="#44403c" />
//           <path d="M48,316 C44.1,316 41,319.1 41,323 C41,326.1 43,328.6 45.7,329.5 C46,329.6 46.1,329.3 46.1,329.1 L46.1,327.9 C44.2,328.3 43.9,327 43.9,327 C43.6,326.2 43.1,326 43.1,326 C42.5,325.6 43.1,325.6 43.1,325.6 C43.8,325.7 44.1,326.3 44.1,326.3 C44.7,327.3 45.7,327 46.1,326.8 C46.2,326.4 46.4,326 46.5,325.9 C45,325.7 43.4,325.1 43.4,322.5 C43.4,321.7 43.7,321.1 44.1,320.6 C44,320.4 43.7,319.7 44.2,318.8 C44.2,318.8 44.8,318.6 46.1,319.5 C46.6,319.3 47.2,319.3 47.8,319.3 C48.4,319.3 49,319.4 49.5,319.5 C50.8,318.6 51.4,318.8 51.4,318.8 C51.9,319.7 51.6,320.4 51.5,320.6 C51.9,321.1 52.2,321.7 52.2,322.5 C52.2,325.1 50.6,325.7 49.1,325.9 C49.3,326.1 49.5,326.5 49.5,327.1 L49.5,329.1 C49.5,329.3 49.6,329.6 50,329.5 C52.7,328.6 54.7,326.1 54.7,323 C54.7,319.1 51.6,316 48,316" fill="#fafaf9" />
          
//           <text x="62" y="326" fill="#44403c" fontSize="9" fontWeight="600" fontFamily="system-ui">education</text>
//           <rect x="48" y="337" width="65" height="4" rx="1" fill="#d6d3d1" />
//           <rect x="48" y="345" width="50" height="4" rx="1" fill="#d6d3d1" />
//           <text x="52" y="362" fill="#78716c" fontSize="7" fontFamily="system-ui">64</text>
//         </g>

//         {/* Job Description Block */}
//         <g filter="url(#shadow)">
//           <rect x="30" y="420" width="110" height="70" rx="4" fill="url(#jobFront)" />
//           <polygon points="30,420 30,490 22,498 22,428" fill="#a8a29e" />
//           <polygon points="30,490 140,490 132,498 22,498" fill="#78716c" />
          
//           <rect x="45" y="438" width="22" height="16" rx="3" fill="#57534e" />
//           <rect x="51" y="433" width="10" height="6" rx="2" fill="none" stroke="#57534e" strokeWidth="2" />
//           <line x1="45" y1="446" x2="67" y2="446" stroke="#78716c" strokeWidth="1.5" />
          
//           <text x="72" y="444" fill="#44403c" fontSize="9" fontWeight="600" fontFamily="system-ui">Job</text>
//           <text x="72" y="455" fill="#44403c" fontSize="9" fontWeight="600" fontFamily="system-ui">Description</text>
          
//           <rect x="45" y="468" width="85" height="4" rx="1" fill="#a8a29e" />
//           <rect x="45" y="478" width="70" height="4" rx="1" fill="#a8a29e" />
//         </g>

//         {/* Flow arrows from repos to processor */}
//         <g stroke="url(#arrowGrad)" strokeWidth="2" fill="none" strokeLinecap="round">
//           <path d="M145,82 C200,82 260,140 320,180" strokeDasharray="5,4">
//             <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.2s" repeatCount="indefinite" />
//           </path>
//           <path d="M145,167 C200,167 260,190 320,220" strokeDasharray="5,4">
//             <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.2s" repeatCount="indefinite" />
//           </path>
//           <path d="M145,252 C200,252 260,250 320,260" strokeDasharray="5,4">
//             <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.2s" repeatCount="indefinite" />
//           </path>
//           <path d="M145,337 C200,337 260,310 320,300" strokeDasharray="5,4">
//             <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.2s" repeatCount="indefinite" />
//           </path>
//           <path d="M145,455 C200,430 260,360 320,330" strokeDasharray="5,4">
//             <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.2s" repeatCount="indefinite" />
//           </path>
//         </g>

//         {/* Central SaaS Composer Block - Simple 2D */}
//         <g filter="url(#shadowLg)">
//           {/* Main card */}
//           <rect x="330" y="130" width="200" height="240" rx="12" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="1.5" />
          
//           {/* Header bar */}
//           <rect x="330" y="130" width="200" height="40" rx="12" fill="#f5f5f4" />
//           <rect x="330" y="158" width="200" height="12" fill="#f5f5f4" />
          
//           {/* Window controls */}
//           <circle cx="352" cy="150" r="5" fill="#ef4444" />
//           <circle cx="368" cy="150" r="5" fill="#eab308" />
//           <circle cx="384" cy="150" r="5" fill="#22c55e" />
          
//           {/* Title */}
//           <text x="430" y="155" textAnchor="middle" fill="#57534e" fontSize="11" fontWeight="600" fontFamily="system-ui">Resume Composer</text>
          
//           {/* Screen area */}
//           <rect x="345" y="180" width="170" height="90" rx="6" fill="#292524" />
          
//           {/* Code lines in screen */}
//           <rect x="355" y="192" width="50" height="4" rx="1" fill="#78716c" />
//           <rect x="355" y="202" width="90" height="4" rx="1" fill="#a8a29e" />
//           <rect x="355" y="212" width="70" height="4" rx="1" fill="#78716c" />
//           <rect x="355" y="222" width="110" height="4" rx="1" fill="#a8a29e" />
//           <rect x="355" y="232" width="60" height="4" rx="1" fill="#78716c" />
//           <rect x="355" y="242" width="85" height="4" rx="1" fill="#a8a29e" />
//           <rect x="355" y="252" width="100" height="4" rx="1" fill="#78716c" />
          
//           {/* Status bar */}
//           <rect x="345" y="280" width="170" height="30" rx="6" fill="#e7e5e4" />
//           <circle cx="362" cy="295" r="5" fill="#22c55e" />
//           <text x="375" y="298" fill="#57534e" fontSize="9" fontWeight="500" fontFamily="system-ui">Ready to generate</text>
          
//           {/* Feature pills */}
//           <rect x="345" y="320" width="50" height="22" rx="11" fill="#d6d3d1" />
//           <text x="370" y="335" textAnchor="middle" fill="#57534e" fontSize="9" fontWeight="500" fontFamily="system-ui">AI</text>
          
//           <rect x="402" y="320" width="55" height="22" rx="11" fill="#d6d3d1" />
//           <text x="430" y="335" textAnchor="middle" fill="#57534e" fontSize="9" fontWeight="500" fontFamily="system-ui">ATS</text>
          
//           <rect x="464" y="320" width="50" height="22" rx="11" fill="#d6d3d1" />
//           <text x="489" y="335" textAnchor="middle" fill="#57534e" fontSize="9" fontWeight="500" fontFamily="system-ui">PDF</text>
//         </g>

//         {/* Output arrow from processor to document */}
//         <g stroke="url(#arrowGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round">
//           <path d="M555,250 C600,240 640,210 680,190" strokeDasharray="6,4">
//             <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
//           </path>
//           <polygon points="688,186 674,190 678,202" fill="#78716c" />
//         </g>

//         {/* Output Document - Simple Resume */}
//         <g filter="url(#shadow)">
//           <rect x="700" y="100" width="130" height="170" rx="4" fill="url(#docFront)" />
//           <polygon points="830,100 830,270 840,280 840,110" fill="url(#docSide)" />
//           <polygon points="700,270 830,270 840,280 710,280" fill="url(#docBottom)" />
          
//           {/* Document header */}
//           <rect x="715" y="115" width="100" height="12" rx="2" fill="#78716c" />
          
//           {/* Photo area */}
//           <rect x="715" y="138" width="32" height="38" rx="2" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />
          
//           {/* Name and title */}
//           <rect x="755" y="142" width="55" height="7" rx="1" fill="#57534e" />
//           <rect x="755" y="155" width="42" height="5" rx="1" fill="#a8a29e" />
//           <rect x="755" y="165" width="50" height="5" rx="1" fill="#a8a29e" />
          
//           {/* Divider */}
//           <line x1="715" y1="188" x2="815" y2="188" stroke="#d6d3d1" strokeWidth="1" />
          
//           {/* Content lines */}
//           <rect x="715" y="198" width="85" height="5" rx="1" fill="#d6d3d1" />
//           <rect x="715" y="210" width="95" height="5" rx="1" fill="#d6d3d1" />
//           <rect x="715" y="222" width="65" height="5" rx="1" fill="#d6d3d1" />
//           <rect x="715" y="234" width="80" height="5" rx="1" fill="#d6d3d1" />
//           <rect x="715" y="246" width="90" height="5" rx="1" fill="#d6d3d1" />
//         </g>

//         {/* Resume label */}
//         <text x="765" y="310" textAnchor="middle" fill="#44403c" fontSize="14" fontWeight="600" fontFamily="system-ui">
//           Your Tailored Resume
//         </text>

//         {/* Composer label */}
//         <text x="430" y="395" textAnchor="middle" fill="#57534e" fontSize="12" fontWeight="600" fontFamily="system-ui">
//           GitCV
//         </text>
//       </svg>
//     </div>
//   )
// }


import React from 'react'
import Image from 'next/image'

export function ResumeIllustration() {
  return (
    <div 
      className="relative w-[500px] h-[650px]" 
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
      className="absolute top-0 left-0 h-[500px] w-[800px] rounded-[3rem] overflow-hidden border-[3px] border-black shadow-2xl transition-transform opacity-60"
      style={{
        transform: 'rotateX(50deg) rotateZ(45deg) translateX(100px) translateY(-450px)',
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

      {/* <div 
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
      </div> */}

      <div 
      className="absolute top-0 left-0 h-[400px] w-[700px] rounded-[3rem] overflow-hidden border-[3px] border-black shadow-2xl transition-transform"
      style={{
        transform: 'rotateX(50deg) rotateZ(45deg) translateX(100px) translateY(-150px)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
      }}
      >
      <Image 
        src='/hero2.png' 
        alt="Top Landscape" 
        fill
        className="object-cover"
        priority
      />
      </div>
    </div>
  )
}

export default ResumeIllustration
