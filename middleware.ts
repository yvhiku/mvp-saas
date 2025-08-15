import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Protect dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        const redirectUrl = new URL('/auth', req.url)
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Redirect authenticated users away from auth page
    if (req.nextUrl.pathname === '/auth' && session) {
      const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/dashboard'
      return NextResponse.redirect(new URL(redirectTo, req.url))
    }
  } catch (error) {
    console.error('Middleware error:', error)
    // Continue to the page if there's an error
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth']
}