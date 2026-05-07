import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/studio') {
    return NextResponse.redirect(new URL('/studio/structure', request.url))
  }
}

export const config = {
  matcher: '/studio',
}
