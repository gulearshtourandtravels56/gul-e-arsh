import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const teamId = parseInt(resolvedParams.id, 10);

    const { data, error } = await supabase
      .from('team_socials')
      .select('*')
      .eq('team_id', teamId)
      .order('id', { ascending: false });

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
    const teamId = parseInt(resolvedParams.id, 10);
    const body = await request.json();
    const { platform, url } = body;

    const { data, error } = await supabase
      .from('team_socials')
      .insert([{ team_id: teamId, platform, url }])
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
