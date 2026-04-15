import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, subtitle, altitude, distance_from_srinagar, description, long_description, best_time, image } = body;

    const { data, error } = await supabase
      .from('locations')
      .insert([
        {
          name,
          subtitle,
          altitude,
          distance_from_srinagar,
          description,
          long_description,
          best_time,
          image,
        },
      ])
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
