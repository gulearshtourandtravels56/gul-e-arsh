import { Database } from "@/supabase/database";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Supabase environment variables are not configured:', {
      supabaseUrl: Boolean(supabaseUrl),
      supabaseKey: Boolean(supabaseKey),
    });
  }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
