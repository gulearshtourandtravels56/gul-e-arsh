import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; inclusionId: string }> }
) {
  try {
    const resolvedParams = await params;
    const inclusionId = parseInt(resolvedParams.inclusionId, 10);
    const body = await request.json();
    const { inclusion } = body;

    const { data, error } = await supabase
      .from('package_inclusions')
      .update({ inclusion })
      .eq('id', inclusionId)
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; inclusionId: string }> }
) {
  try {
    const resolvedParams = await params;
    const inclusionId = parseInt(resolvedParams.inclusionId, 10);
    const { error } = await supabase
      .from('package_inclusions')
      .delete()
      .eq('id', inclusionId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
