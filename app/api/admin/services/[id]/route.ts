import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const { data, error } = await supabase.from('services').select('*').eq('id', id).single();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const body = await request.json();
    const { title, description, icon } = body;

    const { data, error } = await supabase
      .from('services')
      .update({ title, description, icon })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const { error } = await supabase.from('services').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
