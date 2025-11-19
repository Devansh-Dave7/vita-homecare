import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client (use in server components, route handlers, server actions).
// Uses service role key for privileged writes; DO NOT import this into any client component.
export function createServerSupabase() {
  const url = process.env.SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // restricted to server only
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

// Public read client (anonymous) for caching fetches without elevated privileges.
export function createPublicSupabase() {
  const url = process.env.SUPABASE_URL!;
  const anonKey = process.env.SUPABASE_ANON_KEY!;
  return createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}
