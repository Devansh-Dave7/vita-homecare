import { createServerSupabase } from '../supabase/server';

export type AdminUser = {
  id: string;
  email: string;
  role: string;
};

/**
 * Get the current authenticated user session
 * Returns null if no session exists
 */
export async function getSession() {
  const supabase = await createServerSupabase();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    return null;
  }
  
  return session;
}

/**
 * Get the current admin user with role verification
 * Returns null if user is not authenticated or not an admin
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const session = await getSession();
  
  if (!session) {
    return null;
  }
  
  const supabase = await createServerSupabase();
  
  // Check if user has admin role in profiles table
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', session.user.id)
    .single();
  
  if (error || !profile || profile.role !== 'admin') {
    return null;
  }
  
  return {
    id: session.user.id,
    email: session.user.email!,
    role: profile.role,
  };
}

/**
 * Check if current user is authenticated and has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const adminUser = await getAdminUser();
  return adminUser !== null;
}
