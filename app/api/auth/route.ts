import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const isAuthenticated = cookieHeader.includes('jfs_admin_auth=authenticated');
  return NextResponse.json({
    authenticated: isAuthenticated,
    user: isAuthenticated ? { email: 'admin@jfs-tradinget.com', role: 'admin' } : null,
  });
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Default admin password for local CMS management
    const isValid =
      password === 'admin123' ||
      password === 'admin' ||
      (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);

    if (isValid) {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      response.cookies.set('jfs_admin_auth', 'authenticated', {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      });
      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Auth failed' }, { status: 500 });
  }
}

