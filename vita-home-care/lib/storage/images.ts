'use server';

import { createServiceSupabase } from '@/lib/supabase/server';

const TESTIMONIALS_BUCKET = 'testimonials';
const SERVICES_BUCKET = 'services';
const ABOUT_BUCKET = 'about';
const HOME_BUCKET = 'home-images';
const WHY_CHOOSE_US_BUCKET = 'why-choose-us-images';

/**
 * Generic image upload function for Supabase Storage
 */
async function uploadImage(
  bucketName: string,
  folder: string,
  data: { base64: string; fileName: string; contentType: string },
  maxSizeMB: number = 5
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error(`[uploadImage] SUPABASE_SERVICE_ROLE_KEY is not configured`);
    return { 
      success: false, 
      error: 'Server configuration error: Storage service is not properly configured.' 
    };
  }

  const { base64, fileName, contentType } = data;

  if (!base64) {
    return { success: false, error: 'No file data provided' };
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
  if (!allowedTypes.includes(contentType)) {
    return { success: false, error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.' };
  }

  try {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const maxSize = maxSizeMB * 1024 * 1024;
    if (buffer.length > maxSize) {
      return { success: false, error: `File size too large. Maximum size is ${maxSizeMB}MB.` };
    }

    const supabase = createServiceSupabase();

    const fileExt = fileName.split('.').pop()?.toLowerCase() || 'jpg';
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${uniqueFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: contentType,
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error(`[uploadImage] Upload error:`, uploadError);
      
      if (uploadError.message.includes('Bucket not found')) {
        return { 
          success: false, 
          error: `Storage bucket "${bucketName}" not found. Please create it in Supabase.` 
        };
      }
      
      return { success: false, error: uploadError.message };
    }

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return { success: true, url: urlData.publicUrl };
  } catch (err) {
    console.error(`[uploadImage] Unexpected error:`, err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unexpected error occurred while uploading' 
    };
  }
}

/**
 * Upload a testimonial avatar image
 */
export async function uploadTestimonialImage(data: {
  base64: string;
  fileName: string;
  contentType: string;
}): Promise<{ success: boolean; url?: string; error?: string }> {
  return uploadImage(TESTIMONIALS_BUCKET, 'avatars', data, 5);
}

/**
 * Upload a service hero image
 */
export async function uploadServiceImage(data: {
  base64: string;
  fileName: string;
  contentType: string;
}): Promise<{ success: boolean; url?: string; error?: string }> {
  return uploadImage(SERVICES_BUCKET, 'hero', data, 5);
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteTestimonialImage(url: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!url) {
    return { success: true };
  }

  // Extract file path from URL
  const match = url.match(/testimonials\/(.+)$/);
  if (!match) {
    return { success: true }; // Not a Supabase storage URL, skip
  }

  const filePath = match[1];
  const supabase = createServiceSupabase();

  const { error } = await supabase.storage
    .from(TESTIMONIALS_BUCKET)
    .remove([filePath]);

  if (error) {
    console.error('[deleteTestimonialImage] Delete error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete a service image from Supabase Storage
 */
export async function deleteServiceImage(url: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!url) {
    return { success: true };
  }

  // Extract file path from URL
  const match = url.match(/services\/(.+)$/);
  if (!match) {
    return { success: true }; // Not a Supabase storage URL, skip
  }

  const filePath = match[1];
  const supabase = createServiceSupabase();

  const { error } = await supabase.storage
    .from(SERVICES_BUCKET)
    .remove([filePath]);

  if (error) {
    console.error('[deleteServiceImage] Delete error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Upload an about page image (gallery or staff)
 */
export async function uploadAboutImage(data: {
  base64: string;
  fileName: string;
  contentType: string;
  folder?: string;
}): Promise<{ success: boolean; url?: string; error?: string }> {
  return uploadImage(ABOUT_BUCKET, data.folder || 'gallery', {
    base64: data.base64,
    fileName: data.fileName,
    contentType: data.contentType
  }, 5);
}

/**
 * Delete an about page image from Supabase Storage
 */
export async function deleteAboutImage(url: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!url) {
    return { success: true };
  }

  // Extract file path from URL
  const match = url.match(/about\/(.+)$/);
  if (!match) {
    return { success: true }; // Not a Supabase storage URL, skip
  }

  const filePath = match[1];
  const supabase = createServiceSupabase();

  const { error } = await supabase.storage
    .from(ABOUT_BUCKET)
    .remove([filePath]);

  if (error) {
    console.error('[deleteAboutImage] Delete error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Upload a home page image from base64 (hero section)
 * Supports larger files (up to 10MB) for high-quality hero images
 */
export async function uploadHomeImageFromBase64(data: {
  base64: string;
  fileName: string;
  contentType: string;
}): Promise<{ success: boolean; url?: string; error?: string }> {
  return uploadImage(HOME_BUCKET, 'hero', data, 10); // 10MB limit for hero images
}

/**
 * Delete a home page image from Supabase Storage
 */
export async function deleteHomeImage(url: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!url) {
    return { success: true };
  }

  // Extract file path from URL
  const match = url.match(/home-images\/(.+)$/);
  if (!match) {
    return { success: true }; // Not a Supabase storage URL, skip
  }

  const filePath = match[1];
  const supabase = createServiceSupabase();

  const { error } = await supabase.storage
    .from(HOME_BUCKET)
    .remove([filePath]);

  if (error) {
    console.error('[deleteHomeImage] Delete error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Upload a Why Choose Us section image from base64
 * Supports up to 10MB for high-quality images
 */
export async function uploadWhyChooseUsImageFromBase64(data: {
  base64: string;
  fileName: string;
  contentType: string;
  imageNumber?: number; // 1, 2, or 3 (optional)
}): Promise<{ success: boolean; url?: string; error?: string }> {
  return uploadImage(WHY_CHOOSE_US_BUCKET, 'section', data, 10);
}

/**
 * Delete a Why Choose Us section image from Supabase Storage
 */
export async function deleteWhyChooseUsImage(url: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!url) {
    return { success: true };
  }

  // Extract file path from URL
  const match = url.match(/why-choose-us-images\/(.+)$/);
  if (!match) {
    return { success: true }; // Not a Supabase storage URL, skip
  }

  const filePath = match[1];
  const supabase = createServiceSupabase();

  const { error } = await supabase.storage
    .from(WHY_CHOOSE_US_BUCKET)
    .remove([filePath]);

  if (error) {
    console.error('[deleteWhyChooseUsImage] Delete error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
/**
 * Get transformed image URL with size optimization
 * Supabase Storage supports image transformations via URL parameters
 * Note: Made async to comply with 'use server' directive
 */
export async function getTransformedImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    resize?: 'cover' | 'contain' | 'fill';
  } = {}
): Promise<string> {
  if (!url) return '';
  
  // Check if it's a Supabase storage URL
  if (!url.includes('/storage/v1/object/public/')) {
    return url; // Return original URL for external images
  }

  const { width, height, quality = 80, resize = 'cover' } = options;

  // Build transformation parameters
  const params = new URLSearchParams();
  if (width) params.set('width', width.toString());
  if (height) params.set('height', height.toString());
  params.set('quality', quality.toString());
  params.set('resize', resize);

  // Convert public URL to render URL for transformations
  const transformedUrl = url.replace(
    '/storage/v1/object/public/',
    '/storage/v1/render/image/public/'
  );

  return `${transformedUrl}?${params.toString()}`;
}
