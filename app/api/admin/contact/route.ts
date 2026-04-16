import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data: contact, error: contactError } = await supabase
      .from('contact')
      .select('*')
      .eq('id', 1)
      .single();

    if (contactError) throw contactError;

    const { data: socials, error: socialsError } = await supabase
      .from('social_links')
      .select('*')
      .eq('contact_id', 1);

    if (socialsError) throw socialsError;

    return NextResponse.json({ data: { ...contact, social_links: socials } , success: true });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, email, address, address_link, social_links } = body;

    const { data, error } = await supabase
      .from('contact')
      .update({ phone, email, address, address_link })
      .eq('id', 1)
      .select();

    if (error) throw error;

    // Update social links
    if (social_links !== undefined) {
      // Get existing social links
      const { data: existing, error: existingError } = await supabase
        .from('social_links')
        .select('id')
        .eq('contact_id', 1);

      if (existingError) throw existingError;

      const existingIds = existing.map((e: any) => e.id);
      const newIds = social_links.filter((s: any) => s.id).map((s: any) => s.id);
      const toDelete = existingIds.filter((id: number) => !newIds.includes(id));

      // Delete removed social links
      if (toDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('social_links')
          .delete()
          .in('id', toDelete);
        if (deleteError) throw deleteError;
      }

      // Update existing social links
      for (const social of social_links.filter((s: any) => s.id)) {
        const { error: updateError } = await supabase
          .from('social_links')
          .update({ platform: social.platform, url: social.url })
          .eq('id', social.id);
        if (updateError) throw updateError;
      }

      // Insert new social links
      const toInsert = social_links.filter((s: any) => !s.id);
      if (toInsert.length > 0) {
        const socialData = toInsert.map((s: any) => ({
          contact_id: 1,
          platform: s.platform,
          url: s.url,
        }));
        const { error: insertError } = await supabase
          .from('social_links')
          .insert(socialData);
        if (insertError) throw insertError;
      }
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
  }
}
