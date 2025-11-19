import { createClient } from '@supabase/supabase-js';

// Client-side Supabase (for admin panel interactive parts). Only use ANON key here.
// For secured mutations prefer server actions or route handlers that use service role key.
export function getBrowserSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!;
  return createClient(url, anon);
}
