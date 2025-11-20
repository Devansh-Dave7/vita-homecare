"use server";

import { deleteService, createService, updateService } from '@/lib/data/services';

export async function deleteServiceAction(serviceId: string) {
  try {
    const result = await deleteService(serviceId);
    console.log('[deleteServiceAction] Success');
    return result;
  } catch (error) {
    console.error('[deleteServiceAction] Error:', error);
    throw error;
  }
}

export async function createServiceAction(formData: any) {
  try {
    console.log('[createServiceAction] Creating with data:', { ...formData, body_markdown: '...' });
    const result = await createService(formData);
    console.log('[createServiceAction] Success:', result.id);
    return result;
  } catch (error) {
    console.error('[createServiceAction] Error:', error);
    throw error;
  }
}

export async function updateServiceAction(serviceId: string, formData: any) {
  try {
    console.log('[updateServiceAction] Updating', serviceId, 'with data:', { ...formData, body_markdown: '...' });
    const result = await updateService(serviceId, formData);
    console.log('[updateServiceAction] Success:', result.id);
    return result;
  } catch (error) {
    console.error('[updateServiceAction] Error:', error);
    throw error;
  }
}
