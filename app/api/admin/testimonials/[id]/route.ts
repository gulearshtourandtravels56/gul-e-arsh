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
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
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
    const { name, review, location, rating } = body;

    const { data, error } = await supabase
      .from('testimonials')
      .update({ name, review, location, rating })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
