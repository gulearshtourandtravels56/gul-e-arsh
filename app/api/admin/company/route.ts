import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase.from('company').select('*').eq('id', 1).single();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error fetching company info:', error);
    return NextResponse.json({ error: 'Failed to fetch company info' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, tagline, description, mission } = body;

    const { data, error } = await supabase
      .from('company')
      .update({ name, tagline, description, mission, updated_at: new Date().toISOString() })
      .eq('id', 1)
      .select();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error updating company info:', error);
    return NextResponse.json({ error: 'Failed to update company info' }, { status: 500 });
  }
}
