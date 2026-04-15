import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const { data, error } = await supabase
      .from('site_images')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error fetching site image:', error);
    return NextResponse.json({ error: 'Failed to fetch site image' }, { status: 500 });
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
    const { key, url } = body;

    const { data, error } = await supabase
      .from('site_images')
      .update({ key, url })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error updating site image:', error);
    return NextResponse.json({ error: 'Failed to update site image' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const { error } = await supabase.from('site_images').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting site image:', error);
    return NextResponse.json({ error: 'Failed to delete site image' }, { status: 500 });
  }
}
