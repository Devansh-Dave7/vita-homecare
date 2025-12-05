import { createPublicSupabase } from "@/lib/supabase/server";
import ServicesGridClient from "./ServicesGridClient";

type Service = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  hero_image_url?: string;
  category: string | null;
};

type Specialty = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};

type SpecialtiesHeader = {
  title: string;
  description: string;
};

const DEFAULT_HEADER: SpecialtiesHeader = {
  title: 'What we specialise in',
  description: 'Vita Homecare focuses on non-medical home care. We do not replace hospital or clinic services; instead, we provide practical, everyday support around the client in their own home.',
};

async function getServicesData() {
  const supabase = createPublicSupabase();
  
  // Run all queries in parallel for better performance
  const [servicesResult, specialtiesResult, headerResult] = await Promise.all([
    supabase
      .from('services')
      .select('id, slug, name, short_description, hero_image_url, category')
      .order('name', { ascending: true }),
    supabase
      .from('service_specialties')
      .select('id, name, slug, description, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('site_settings')
      .select('value_json')
      .eq('key', 'services_specialties_header')
      .maybeSingle()
  ]);

  const services: Service[] = (servicesResult.data as Service[]) || [];
  const specialties: Specialty[] = (specialtiesResult.data as Specialty[]) || [];
  
  const headerVal = (headerResult.data?.value_json as any) || {};
  const header: SpecialtiesHeader = {
    title: headerVal.title || DEFAULT_HEADER.title,
    description: headerVal.description || DEFAULT_HEADER.description,
  };

  return { services, specialties, header };
}

export default async function ServicesGrid() {
  const { services, specialties, header } = await getServicesData();

  return (
    <ServicesGridClient 
      services={services} 
      specialties={specialties} 
      header={header} 
    />
  );
}
