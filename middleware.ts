import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check if there is an active Supabase project auth cookie or admin session cookie
    const allCookies = request.cookies.getAll();
    const hasSupabaseSession = allCookies.some(
      (cookie) =>
        (cookie.name.startsWith('sb-') && cookie.name.includes('-auth-token')) ||
        (cookie.name === 'jfs_admin_auth' && cookie.value === 'authenticated')
    );

    if (!hasSupabaseSession) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
