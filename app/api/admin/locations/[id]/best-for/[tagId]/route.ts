import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; tagId: string }> }
) {
  try {
    const resolvedParams = await params;
    const tagId = parseInt(resolvedParams.tagId, 10);
    const body = await request.json();
    const { tag } = body;

    const { data, error } = await supabase
      .from('location_best_for')
      .update({ tag })
      .eq('id', tagId)
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; tagId: string }> }
) {
  try {
    const resolvedParams = await params;
    const tagId = parseInt(resolvedParams.tagId, 10);
    const { error } = await supabase
      .from('location_best_for')
      .delete()
      .eq('id', tagId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
