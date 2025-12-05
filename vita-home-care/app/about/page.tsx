import TopBar from "@/components/TopBar";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import AboutPageClient from "@/components/AboutPageClient";
import { Onest } from "next/font/google";
import React from "react";
import { createPublicSupabase } from "@/lib/supabase/server";

const onest = Onest({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "About Us | Vita Homecare",
  description:
    "Learn about Vita Homecare's vision, mission, and compassionate caregiving team in Zambia.",
};

type AboutPageContent = {
  hero_heading: string;
  hero_description: string;
  gallery_image_1: { url: string; alt: string };
  gallery_image_2: { url: string; alt: string };
  gallery_image_3: { url: string; alt: string };
  vision_text: string;
  mission_text: string;
  team_heading: string;
  team_description: string;
};

const defaultContent: AboutPageContent = {
  hero_heading: 'Why we love what we do',
  hero_description: 'We believe home is where care is most meaningful. Our healthcare assistants and nurse assistants (not registered nurses) provide flexible, non-medical support that preserves dignity, builds independence, and keeps families closely connected.',
  gallery_image_1: { url: 'https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1', alt: 'Warm embrace between senior couple' },
  gallery_image_2: { url: '/caregiver with a black man.png', alt: 'Caregiver with senior smiling' },
  gallery_image_3: { url: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1', alt: 'Senior exercising with caregiver support' },
  vision_text: "To be Zambia's most trusted home care provider, delivering compassionate and reliable support at home.",
  mission_text: "Provide high-quality, flexible non-medical home care through trained caregivers, ensuring clients' dignity, independence, and family connection",
  team_heading: 'Meet our professionals',
  team_description: 'Our caregivers provide personal care, companionship, and everyday support.'
};

const defaultSpecialtiesHeader = {
  title: 'What we specialise in',
  description: 'Vita Homecare focuses on non-medical home care. We do not replace hospital or clinic services; instead, we provide practical, everyday support around the client in their own home.'
};

async function getAboutPageData() {
  const supabase = createPublicSupabase();

  // Run all queries in parallel for better performance
  const [contentResult, headerResult, specialtiesResult, staffResult] = await Promise.all([
    supabase.from('about_page_content').select('key, value_json'),
    supabase
      .from('site_settings')
      .select('value_json')
      .eq('key', 'services_specialties_header')
      .maybeSingle(),
    supabase
      .from('service_specialties')
      .select('id, name, description')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('staff_members')
      .select('id, name, role, photo_url')
      .order('sort_order', { ascending: true })
  ]);

  // Process content
  let content = { ...defaultContent };
  if (contentResult.data) {
    const contentMap: Record<string, any> = {};
    contentResult.data.forEach((row: any) => {
      contentMap[row.key] = row.value_json;
    });
    content = {
      hero_heading: contentMap.hero_heading || defaultContent.hero_heading,
      hero_description: contentMap.hero_description || defaultContent.hero_description,
      gallery_image_1: contentMap.gallery_image_1 || defaultContent.gallery_image_1,
      gallery_image_2: contentMap.gallery_image_2 || defaultContent.gallery_image_2,
      gallery_image_3: contentMap.gallery_image_3 || defaultContent.gallery_image_3,
      vision_text: contentMap.vision_text || defaultContent.vision_text,
      mission_text: contentMap.mission_text || defaultContent.mission_text,
      team_heading: contentMap.team_heading || defaultContent.team_heading,
      team_description: contentMap.team_description || defaultContent.team_description,
    };
  }

  // Process header
  const headerVal = (headerResult.data?.value_json as any) || {};
  const specialtiesHeader = {
    title: headerVal.title || defaultSpecialtiesHeader.title,
    description: headerVal.description || defaultSpecialtiesHeader.description,
  };

  const specialties = specialtiesResult.data || [];
  const staff = staffResult.data || [];

  return { content, specialtiesHeader, specialties, staff };
}

export default async function AboutPage() {
  const { content, specialtiesHeader, specialties, staff } = await getAboutPageData();

  return (
    <main className={`${onest.className} min-h-screen bg-white text-[#2c254c]`}>
      <TopBar />
      <HeaderNav />

      {/* Pass pre-fetched data to client component */}
      <AboutPageClient 
        initialContent={content}
        initialSpecialtiesHeader={specialtiesHeader}
        initialSpecialties={specialties}
        initialStaff={staff}
      />

      <Footer />
    </main>
  );
}
