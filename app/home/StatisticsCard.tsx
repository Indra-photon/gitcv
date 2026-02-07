import React from 'react'
import { Paragraph } from '@/components/Paragraph'

function StatisticsCard() {
  return (
        <div className="relative bg-neutral-900 rounded-3xl p-8 md:col-span-2 border-2 border-gray-800 flex flex-col justify-center items-center text-center min-h-[300px] overflow-hidden">
            <div 
                className="absolute top-0 right-0 w-4/5 h-4/5 opacity-70 pointer-events-none z-30"
                style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(circle at top right, black 0%, transparent 90%)',
                // WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)'
                }}
                aria-hidden="true"
            />

      
      {/* Dotted Background Pattern with Masking */}
      {/* <div 
        className="absolute top-0 right-0 w-2/3 h-2/3 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)'
        }}
        aria-hidden="true"
      /> */}

      {/* Content */}
      <div className="relative z-10 mb-4">
        <div className="text-7xl font-bold text-white mb-2 tabular-nums">
          We save your TIME.
        </div>
        <Paragraph className="text-gray-300 text-xl text-balance max-w-2xl">
          Create tailored resumes for every role you apply to
        </Paragraph>
      </div>
      
      {/* Comparison */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 mt-6 max-w-2xl">
            <div className="flex-1 bg-neutral-900 rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
            <div 
                className="absolute top-0 right-0 w-2/3 h-2/3 opacity-70 pointer-events-none z-30"
                style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(circle at top right, black 0%, transparent 90%)',
                // WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)'
                }}
                aria-hidden="true"
            />
            <Paragraph className="text-neutral-200 text-lg mb-2">Manual Tailoring</Paragraph>
            <Paragraph className="text-neutral-300 text-2xl font-bold tabular-nums">2-3 hrs<span className='text-xs pl-2'>/ each resume</span></Paragraph>
            </div>
        
        <div className="text-green-400 text-3xl rotate-90 md:rotate-0">→</div>
        
        <div className="flex-1 bg-green-500/10 rounded-2xl p-6 border border-green-500/30">
          <Paragraph variant='muted' className="text-green-400 text-sm mb-2">With GitCVs</Paragraph>
          <Paragraph className="text-neutral-300 text-2xl font-bold tabular-nums">30 min<span className='text-xs pl-2'>/resume</span></Paragraph>
        </div>
      </div>

      {/* Supporting Message */}
      <div className="relative z-10 mt-8 max-w-xl">
        <Paragraph className="text-gray-400 text-sm text-pretty">
          Instantly generate customized resumes for every tech role—frontend, backend, full-stack, internships, and more. Save time and stand out with applications tailored in minutes.
        </Paragraph>
      </div>
    </div>
  )
}

export default StatisticsCard