'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';

// Mock repository data for animation
const repositories = [
  { id: 1, name: 'ecommerce-app', tech: 'React', icon: '🛍️' },
  { id: 2, name: 'chat-platform', tech: 'Node.js', icon: '💬' },
  { id: 3, name: 'task-manager', tech: 'Next.js', icon: '✅' }
];

// Mini Repository Card Component
const MiniRepoCard = ({ name, tech, icon }: { name: string; tech: string; icon: string }) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-900 truncate max-w-[120px]">
          {name}
        </span>
        <span className="text-xs text-gray-500">{tech}</span>
      </div>
    </div>
  );
};

const GitHubConnectCard = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors overflow-hidden">
      
      {/* Animated Repository Cards (Behind Content) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {repositories.map((repo, index) => (
          <motion.div
            key={repo.id}
            className="absolute"
            initial={{ 
              x: '-100%', 
              y: '100%', 
              opacity: 0,
              scale: 0.8
            }}
            animate={shouldReduceMotion ? {
              opacity: 0.3
            } : { 
              x: ['calc(-100% - 50px)', 'calc(100% + 50px)'],
              y: ['calc(100% + 50px)', 'calc(-100% - 50px)'],
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.8]
            }}
            transition={shouldReduceMotion ? {
              duration: 0
            } : {
              duration: 4,
              delay: index * 1.3,
              repeat: Infinity,
              ease: 'easeOut',
              repeatDelay: (repositories.length - 1) * 1.3
            }}
            style={{
              left: `${20 + index * 10}%`,
              bottom: `${10 + index * 5}%`
            }}
          >
            <MiniRepoCard {...repo} />
          </motion.div>
        ))}
      </div>

      {/* Static Content (In Front) */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="size-12 bg-black rounded-2xl flex items-center justify-center mb-6">
          <svg className="size-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
        
        <Heading className="text-2xl text-neutral-500 mb-3 text-balance">
          One-Click GitHub Sync
        </Heading>
        
        <Paragraph className="text-gray-600 text-pretty">
          Connect once. Select repos. Generate resume.
        </Paragraph>
      </div>
    </div>
  );
};

export default GitHubConnectCard;