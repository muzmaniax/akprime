import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = process.env.CMS_PASSWORD ?? 'akprime-cms'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let the login page and the auth API through without a check
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/cms/auth')
  ) {
    return NextResponse.next()
  }

  // Guard everything else under /admin
  if (pathname.startsWith('/admin')) {
    const cookie = request.cookies.get('cms_auth')?.value
    if (cookie !== PASSWORD) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
