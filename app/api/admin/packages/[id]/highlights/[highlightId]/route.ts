import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; highlightId: string }> }
) {
  try {
    const resolvedParams = await params;
    const highlightId = parseInt(resolvedParams.highlightId, 10);
    const body = await request.json();
    const { highlight } = body;

    const { data, error } = await supabase
      .from('package_highlights')
      .update({ highlight })
      .eq('id', highlightId)
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; highlightId: string }> }
) {
  try {
    const resolvedParams = await params;
    const highlightId = parseInt(resolvedParams.highlightId, 10);
    const { error } = await supabase
      .from('package_highlights')
      .delete()
      .eq('id', highlightId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
