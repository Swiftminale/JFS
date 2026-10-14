import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      authenticated: false,
      message: 'Local authentication is disabled. Supabase Authentication is strictly required.',
    },
    { status: 403 }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: 'Local authentication is disabled. Please authenticate through Supabase Auth.',
    },
    { status: 403 }
  );
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Local session cleared' });
  response.cookies.set('jfs_admin_auth', '', {
    httpOnly: false,
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'lax',
  });
  return response;
}

