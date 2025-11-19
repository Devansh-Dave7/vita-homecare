-- Add missing RLS policy for profiles table
-- This allows authenticated users to read their own profile
-- Run this in Supabase SQL Editor

CREATE POLICY "Users can read own profile" 
ON profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles';
