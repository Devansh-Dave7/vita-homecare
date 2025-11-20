-- Add delete policies for form submissions
-- Run this in Supabase SQL editor if you already have the tables created

-- Check if delete policies already exist, if not create them
DO $$ 
BEGIN
  -- Add delete policy for contact_submissions
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Admin delete contact_submissions'
  ) THEN
    CREATE POLICY "Admin delete contact_submissions" ON contact_submissions
      FOR DELETE 
      USING (
        auth.role() = 'authenticated' 
        AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
      );
  END IF;

  -- Add delete policy for inquiry_submissions
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'inquiry_submissions' 
    AND policyname = 'Admin delete inquiry_submissions'
  ) THEN
    CREATE POLICY "Admin delete inquiry_submissions" ON inquiry_submissions
      FOR DELETE 
      USING (
        auth.role() = 'authenticated' 
        AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
      );
  END IF;
END $$;
