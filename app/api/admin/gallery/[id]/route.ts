import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json();
    const { title, location, description, image, created_date } = body;
    const { id } = await params;

    const { data, error } = await supabase
      .from('gallery')
      .update({ title, location, description, image, created_date })
      .eq('id', Number(id))
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', Number(id));

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
