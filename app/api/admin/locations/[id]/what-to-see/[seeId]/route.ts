import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; seeId: string }> }
) {
  try {
    const resolvedParams = await params;
    const seeId = parseInt(resolvedParams.seeId, 10);
    const body = await request.json();
    const { title, image, description } = body;

    const { data, error } = await supabase
      .from('location_what_to_see')
      .update({ title, image, description })
      .eq('id', seeId)
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; seeId: string }> }
) {
  try {
    const resolvedParams = await params;
    const seeId = parseInt(resolvedParams.seeId, 10);
    const { error } = await supabase
      .from('location_what_to_see')
      .delete()
      .eq('id', seeId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
