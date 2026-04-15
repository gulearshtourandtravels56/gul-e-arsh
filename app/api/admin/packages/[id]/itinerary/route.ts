import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const packageId = parseInt(resolvedParams.id, 10);

    const { data, error } = await supabase
      .from('package_itinerary')
      .select('*')
      .eq('package_id', packageId)
      .order('day', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const packageId = parseInt(resolvedParams.id, 10);
    const body = await request.json();
    const { day, title, details } = body;

    const { data, error } = await supabase
      .from('package_itinerary')
      .insert([{ package_id: packageId, day, title, details }])
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
