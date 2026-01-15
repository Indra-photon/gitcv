// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/profile(.*)'])
// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)',
//   '/sign-up(.*)'
// ])

// export default clerkMiddleware(async (auth, req) => {
//   const { isAuthenticated, redirectToSignIn } = await auth()

//   if (!isAuthenticated && isProtectedRoute(req)) {
//     // Add custom logic to run before redirecting

//     return redirectToSignIn()
//   }
// },)

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isCompleteProfileRoute = createRouteMatcher(['/complete-profile'])
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/profile(.*)'])
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth()
  

  // For users visiting /complete-profile, don't try to redirect
  if (isAuthenticated && isCompleteProfileRoute(req)) {
    return NextResponse.next()
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!isAuthenticated && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  // Catch users who do not have `profileComplete: true` in their publicMetadata
  // Redirect them to the /complete-profile route to complete their profile
  if (isAuthenticated && !sessionClaims?.metadata?.profileComplete) {
    const completeProfileUrl = new URL('/complete-profile', req.url)
    return NextResponse.redirect(completeProfileUrl)
  }

  // If the user is logged in and has completed profile, let them view protected routes
  if (isAuthenticated && !isPublicRoute(req)) return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};