"use server";

import { redirect } from 'next/navigation';
import { createServerSupabase } from '../supabase/server';

export type AuthResult = {
  success: boolean;
  error?: string;
};

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const supabase = await createServerSupabase();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }
  
  if (!data.user) {
    return {
      success: false,
      error: 'Authentication failed',
    };
  }
  
  // Verify user has admin role using service role to bypass RLS
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();
  
  console.log('[signIn] Profile check:', { profile, profileError, userId: data.user.id });
  
  if (profileError || !profile || profile.role !== 'admin') {
    // Sign out if not admin
    await supabase.auth.signOut();
    return {
      success: false,
      error: `Unauthorized: Admin access required. Profile error: ${profileError?.message || 'No profile or not admin'}`,
    };
  }
  
  return { success: true };
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
