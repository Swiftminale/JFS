import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Default admin password for local CMS management
    if (password === 'admin123' || password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      response.cookies.set('jfs_admin_auth', 'authenticated', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid admin password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Auth failed' }, { status: 500 });
  }
}
