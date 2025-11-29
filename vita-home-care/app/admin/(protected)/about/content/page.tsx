import { getAboutPageContent } from '@/lib/data/about';
import AboutContentForm from '@/components/admin/AboutContentForm';

export default async function AboutContentPage() {
  const content = await getAboutPageContent();

  return <AboutContentForm initialContent={content} />;
}
