import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('admins')
      .select('id, username, name, role')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, admin: data });
    response.cookies.set('admin_auth', data.username, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
