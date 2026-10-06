import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = process.env.CMS_PASSWORD ?? 'akprime-cms';
const GULF_COUNTRIES = new Set(['AE', 'SA', 'QA', 'KW', 'BH', 'OM']);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Let login page and auth API through without a check
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/cms/auth')
  ) {
    return NextResponse.next();
  }

  // 2. Guard everything else under /admin
  if (pathname.startsWith('/admin')) {
    const cookie = request.cookies.get('cms_auth')?.value;
    if (cookie !== PASSWORD) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3. Skip internal Next.js assets, API endpoints, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // Detect Gulf location from standard edge/CDN headers
  const country = (
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    ''
  ).toUpperCase();
  const isGulf = GULF_COUNTRIES.has(country);

  // 4. If path already has /en or /ar prefix, pass through without overriding explicit choice
  if (
    pathname === '/en' ||
    pathname.startsWith('/en/') ||
    pathname === '/ar' ||
    pathname.startsWith('/ar/')
  ) {
    const response = NextResponse.next();
    if (isGulf && !request.cookies.has('ak_geo_gulf')) {
      response.cookies.set('ak_geo_gulf', '1', { path: '/', maxAge: 86400, sameSite: 'lax' });
    }
    return response;
  }

  // 5. Language-neutral entry:
  // Honor saved manual cookie ('ak_lang'), otherwise default to English ('en')
  // Arabic suggestion banner will be offered if browser or location suggests it.
  const savedLang = request.cookies.get('ak_lang')?.value;
  const targetLocale = (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'en';

  const redirectPath = `/${targetLocale}${pathname === '/' ? '' : pathname}${search}`;
  const redirectUrl = new URL(redirectPath, request.url);
  const response = NextResponse.redirect(redirectUrl, 308);

  if (isGulf) {
    response.cookies.set('ak_geo_gulf', '1', { path: '/', maxAge: 86400, sameSite: 'lax' });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
