import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; socialId: string }> }
) {
  try {
    const resolvedParams = await params;
    const socialId = parseInt(resolvedParams.socialId, 10);
    const body = await request.json();
    const { platform, url } = body;

    const { data, error } = await supabase
      .from('team_socials')
      .update({ platform, url })
      .eq('id', socialId)
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; socialId: string }> }
) {
  try {
    const resolvedParams = await params;
    const socialId = parseInt(resolvedParams.socialId, 10);
    const { error } = await supabase
      .from('team_socials')
      .delete()
      .eq('id', socialId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
