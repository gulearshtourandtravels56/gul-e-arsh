import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase.from('services').select('*');

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, icon } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('services').insert([{ title, description, icon }]).select();

    if (error) throw error;

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
