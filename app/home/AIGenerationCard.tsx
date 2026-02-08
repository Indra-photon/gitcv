'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SubHeading } from '@/components/SubHeading';
import { Paragraph } from '@/components/Paragraph';
import { cn } from '@/lib/utils';

const transformationExamples = [
  {
    id: 'readme',
    label: 'README',
    icon: '📄',
    github: {
      file: 'README.md',
      content: 'E-commerce Platform\n\nFull-stack online store with\nsecure payments and admin panel.'
    },
    resume: 'Developed full-stack e-commerce platform using React and Node.js to enable small businesses to sell products online with integrated payment processing'
  },
  {
    id: 'techstack',
    label: 'Tech Stack',
    icon: '⚙️',
    github: {
      file: 'package.json',
      content: '{\n  "dependencies": {\n    "express": "^4.18.0",\n    "jsonwebtoken": "^9.0",\n    "stripe": "^12.0.0"\n  }\n}'
    },
    resume: 'Integrated Stripe payment gateway and JWT authentication to process secure transactions with real-time order updates and webhook verification'
  },
  {
    id: 'commits',
    label: 'Commits',
    icon: '💬',
    github: {
      file: 'git log',
      content: 'commit a1b2c3d\nAdded Redis caching layer\n\ncommit e4f5g6h\nOptimized database queries'
    },
    resume: 'Optimized API performance by implementing Redis caching, reducing database load by 60% and improving response times to under 100ms'
  }
];

const AIGenerationCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const activeExample = transformationExamples[activeIndex];

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (shouldReduceMotion) return;

    const startTime = Date.now();
    const duration = 5000; // 5 seconds for full cycle
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime % (duration * 2)) / duration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;
      
      setSliderPosition(percentage);
      autoplayRef.current = setTimeout(animate, 16); // ~60fps
    };

    animate();
  }, [shouldReduceMotion]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  // Start autoplay on mount and when activeIndex changes
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay, activeIndex]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    stopAutoplay(); // Stop autoplay when user interacts
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percent)));
  }, [stopAutoplay]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    startAutoplay(); // Restart autoplay when user stops dragging
  }, [startAutoplay]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleTouchEnd = useCallback(() => {
    startAutoplay(); // Restart autoplay when touch ends
  }, [startAutoplay]);

  return (
    <div className="bg-white rounded-3xl p-8 md:col-span-3 border-2 border-gray-200">
      {/* Header */}
      <div className="mb-8">
        <SubHeading className="text-neutral-500 mb-3 text-balance">
          AI Transforms Your GitHub Into Professional Bullets
        </SubHeading>
        
        <Paragraph className="text-gray-600 text-pretty">
          Watch how AI converts raw GitHub data into polished resume content
        </Paragraph>

        {/* Tab Switcher */}
        <div className="flex gap-2 mt-6">
          {transformationExamples.map((example, index) => (
            <button
              key={example.id}
              onClick={() => {
                setActiveIndex(index);
                setSliderPosition(50);
              }}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors",
                activeIndex === index
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <span className="hidden sm:inline font-sans tracking-tighter">{example.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Compare Container with 3D Effect */}
      <div className="w-full h-[300px] md:h-[350px] flex items-center justify-center [perspective:800px] [transform-style:preserve-3d]">
        <div
          style={{
            transform: shouldReduceMotion ? 'none' : 'rotateX(5deg) translateZ(20px)',
          }}
          className="w-full h-full"
        >
          <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden rounded-3xl border-2 border-gray-200 cursor-col-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Resume View (Bottom Layer) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`resume-${activeIndex}`}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
                className="absolute inset-0"
              >
                <ResumeMockup bulletPoint={activeExample.resume} />
              </motion.div>
            </AnimatePresence>

            {/* GitHub View (Top Layer with Clip) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`github-${activeIndex}`}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <GitHubMockup 
                  file={activeExample.github.file}
                  content={activeExample.github.content}
                />
              </motion.div>
            </AnimatePresence>

            {/* Slider Line */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-blue-600 z-50 pointer-events-none"
              style={{
                left: `${sliderPosition}%`,
              }}
              transition={{ duration: 0 }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-10 rounded-full bg-blue-600 border-4 border-white shadow-lg flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing">
                <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-6 px-4">
        <div className="flex items-center gap-2 text-sm">
          <svg className="size-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="font-sans text-gray-700">GitHub Data</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-sans text-blue-600">Professional Resume</span>
          <svg className="size-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// GitHub View Component
const GitHubMockup = ({ 
  file,
  content 
}: { 
  file: string;
  content: string;
}) => {
  return (
    <div className="w-full h-full bg-gray-900 p-8 relative">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
        <span className="text-xs text-gray-400 ml-3 font-mono">{file}</span>
      </div>

      {/* Content */}
      <pre className="text-base text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
        {content}
      </pre>

      {/* GitHub Watermark */}
      <div className="absolute bottom-8 right-8 opacity-5">
        <svg className="size-24 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
    </div>
  );
};

// Resume View Component
const ResumeMockup = ({ bulletPoint }: { bulletPoint: string }) => {
  return (
    <div className="w-full h-full bg-white p-8 relative overflow-auto">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">John Developer</div>
            <div className="text-sm text-gray-500 mt-1">Full-Stack Engineer</div>
          </div>
          <div className="size-14 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl">👨‍💻</span>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div>
        <div className="text-xl font-bold text-gray-900 mb-4">Professional Experience</div>
        
        <div className="flex items-start gap-4">
          <div className="size-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 mt-1">
            <svg className="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">Software Engineer</div>
            <div className="text-sm text-gray-500 mb-4">Tech Company • 2023 - Present</div>
            
            {/* The AI-Generated Bullet */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg mt-0.5">•</span>
                <Paragraph className="text-gray-800 leading-relaxed text-pretty">
                  {bulletPoint}
                </Paragraph>
              </div>
              
              {/* Placeholder bullets */}
              <div className="flex items-start gap-3 opacity-20">
                <span className="text-blue-600 font-bold text-lg mt-0.5">•</span>
                <Paragraph className="text-gray-800 leading-relaxed">
                  Collaborated with cross-functional teams to deliver...
                </Paragraph>
              </div>
              <div className="flex items-start gap-3 opacity-20">
                <span className="text-blue-600 font-bold text-lg mt-0.5">•</span>
                <Paragraph className="text-gray-800 leading-relaxed">
                  Implemented automated testing to ensure...
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Watermark */}
      <div className="absolute bottom-8 right-8 opacity-3">
        <svg className="size-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    </div>
  );
};

export default AIGenerationCard;