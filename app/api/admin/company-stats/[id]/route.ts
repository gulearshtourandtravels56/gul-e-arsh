import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const body = await request.json();
    const { company_id, value, label } = body;
    const normalizedCompanyId = Number(company_id) || 1;

    const { data, error } = await supabase
      .from('company_stats')
      .update({ company_id: normalizedCompanyId, value, label })
      .eq('id', id)
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const { error } = await supabase.from('company_stats').delete().eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
