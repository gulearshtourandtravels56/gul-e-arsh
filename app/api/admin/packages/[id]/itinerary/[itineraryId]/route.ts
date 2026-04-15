import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itineraryId: string }> }
) {
  try {
    const resolvedParams = await params;
    const itineraryId = parseInt(resolvedParams.itineraryId, 10);
    const body = await request.json();
    const { day, title, details } = body;

    const { data, error } = await supabase
      .from('package_itinerary')
      .update({ day, title, details })
      .eq('id', itineraryId)
      .select();

    if (error) throw error;
    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; itineraryId: string }> }
) {
  try {
    const resolvedParams = await params;
    const itineraryId = parseInt(resolvedParams.itineraryId, 10);
    const { error } = await supabase
      .from('package_itinerary')
      .delete()
      .eq('id', itineraryId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
