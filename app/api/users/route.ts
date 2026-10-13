import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

function getUsers() {
  try {
    const raw = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users: any[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

export async function GET() {
  const users = getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const users = getUsers();
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: role || 'Editor',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    users.push(newUser);
    saveUsers(users);

    return NextResponse.json({ success: true, user: newUser });
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, role, status } = body;

    let users = getUsers();
    users = users.map((u: any) => (u.id === id ? { ...u, name, role, status } : u));
    saveUsers(users);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User id is required' }, { status: 400 });
    }

    let users = getUsers();
    users = users.filter((u: any) => u.id !== id);
    saveUsers(users);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
