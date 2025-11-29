import { getAboutPageContent } from '@/lib/data/about';
import AboutGalleryForm from '@/components/admin/AboutGalleryForm';

export default async function AboutGalleryPage() {
  const content = await getAboutPageContent();

  return <AboutGalleryForm initialContent={content} />;
}
