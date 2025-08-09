
import { clerkMiddleware } from '@clerk/nextjs/server';

// If you want to make routes public, check Clerk's docs for your version.
// The 'publicRoutes' option is not supported in this version.
// Neither 'publicRoutes' nor 'ignoredRoutes' are supported in this Clerk version.
// To make routes public, do NOT use Clerk protection/hooks/components on those pages (e.g., '/', '/ai').
// Only use Clerk's hooks/components (like withAuth, SignedIn, SignedOut) on protected pages/components.
export default clerkMiddleware();


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};