// 'use client'

// import { useEffect, useState } from 'react'
// import { useSearchParams, useRouter } from 'next/navigation'
// import { useUserStore } from '@/lib/store'

// export default function SuccessPage() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const sessionId = searchParams.get('session_id')
//   const tier = searchParams.get('tier') || 'premium_monthly'
  
//   const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
//   const { setSubscription } = useUserStore()

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const response = await fetch('/api/payments/verify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ tier })
//         })

//         const data = await response.json()

//         if (data.success && data.verified) {
//           setStatus('success')
          
//           // Update store
//           setSubscription({
//             tier: data.tier,
//             status: 'active',
//             dodo_customer_id: null,
//             dodo_subscription_id: null,
//             generation_attempts_used: 0,
//             generation_attempts_limit: -1,
//             saved_resumes_count: 0,
//             saved_resumes_limit: -1,
//             monthly_resumes_created: 0,
//             monthly_resumes_limit: -1
//           })

//           // Redirect to dashboard after 3 seconds
//           setTimeout(() => {
//             router.push('/dashboard')
//           }, 3000)
//         } else {
//           setStatus('error')
//         }
//       } catch (error) {
//         console.error('Verification error:', error)
//         setStatus('error')
//       }
//     }

//     if (sessionId) {
//       verifyPayment()
//     }
//   }, [sessionId, tier, setSubscription, router])

//   if (status === 'verifying') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
//           <h1 className="text-2xl font-bold mb-2">Verifying Payment...</h1>
//           <p className="text-neutral-600">Please wait while we confirm your purchase</p>
//         </div>
//       </div>
//     )
//   }

//   if (status === 'success') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">✅</div>
//           <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
//           <p className="text-neutral-600 mb-4">Welcome to Premium</p>
//           <p className="text-sm text-neutral-500">Redirecting to dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <div className="text-6xl mb-4">⚠️</div>
//         <h1 className="text-3xl font-bold mb-2">Verification Error</h1>
//         <p className="text-neutral-600 mb-4">Please contact support if payment was deducted</p>
//         <button 
//           onClick={() => router.push('/dashboard')}
//           className="px-4 py-2 bg-neutral-900 text-white rounded"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     </div>
//   )
// }

// app/dashboard/success/page.tsx
import { Suspense } from 'react'
import SuccessPageClient from './SuccessPageClient'

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Loading...</h1>
        </div>
      </div>
    }>
      <SuccessPageClient />
    </Suspense>
  )
}