import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Skip middleware if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Protect dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        return NextResponse.redirect(new URL('/auth', req.url))
      }
    }

    // Redirect authenticated users away from auth page
    if (req.nextUrl.pathname === '/auth' && session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  } catch (error) {
    console.error('Middleware error:', error)
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth']
}