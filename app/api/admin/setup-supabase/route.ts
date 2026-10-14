import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { supabaseUrl, supabaseAnonKey } = await request.json();

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Both Supabase URL and Anon Key are required.' },
        { status: 400 }
      );
    }

    const cleanUrl = supabaseUrl.trim().replace(/\/+$/, '');
    const cleanKey = supabaseAnonKey.trim();

    if (!cleanUrl.startsWith('https://')) {
      return NextResponse.json(
        { error: 'Supabase URL must start with https://' },
        { status: 400 }
      );
    }

    const envPath = path.join(process.cwd(), '.env.local');
    let existingContent = '';
    if (fs.existsSync(envPath)) {
      existingContent = fs.readFileSync(envPath, 'utf8');
    }

    // Replace or append
    let lines = existingContent ? existingContent.split('\n') : [];
    const keysToSet: Record<string, string> = {
      NEXT_PUBLIC_SUPABASE_URL: cleanUrl,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: cleanKey,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: cleanKey,
      ADMIN_PASSWORD: 'admin123',
    };

    const newLines: string[] = [];
    const processedKeys = new Set<string>();

    for (const line of lines) {
      const trimmed = line.trim();
      let matched = false;
      for (const [k, v] of Object.entries(keysToSet)) {
        if (trimmed.startsWith(`${k}=`)) {
          newLines.push(`${k}=${v}`);
          processedKeys.add(k);
          matched = true;
          break;
        }
      }
      if (!matched) {
        newLines.push(line);
      }
    }

    for (const [k, v] of Object.entries(keysToSet)) {
      if (!processedKeys.has(k)) {
        newLines.push(`${k}=${v}`);
      }
    }

    fs.writeFileSync(envPath, newLines.join('\n').trim() + '\n', 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Supabase credentials saved successfully in .env.local! Page will now reload.',
    });
  } catch (error: any) {
    console.error('Failed to save Supabase config:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update .env.local file' },
      { status: 500 }
    );
  }
}
