import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase.from('site_images').select('*');

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error fetching site images:', error);
    return NextResponse.json({ error: 'Failed to fetch site images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, url } = body;

    if (!key || !url) {
      return NextResponse.json({ error: 'Key and URL are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('site_images')
      .insert([{ key, url }])
      .select();

    if (error) throw error;

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating site image:', error);
    return NextResponse.json({ error: 'Failed to create site image' }, { status: 500 });
  }
}
