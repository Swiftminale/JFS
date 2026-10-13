import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/contentService';

export async function GET() {
  try {
    const data = getContent();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = saveContent(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
