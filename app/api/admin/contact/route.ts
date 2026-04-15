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
    if (social_links) {
      // Delete existing social links
      await supabase.from('social_links').delete().eq('contact_id', 1);

      // Insert new ones
      if (social_links.length > 0) {
        const socialData = social_links.map((social: any) => ({
          contact_id: 1,
          platform: social.platform,
          url: social.url,
        }));

        const { error: socialError } = await supabase.from('social_links').insert(socialData);
        if (socialError) throw socialError;
      }
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
  }
}
