import { getAboutPageContent } from '@/lib/data/about';
import { getSpecialtiesHeader } from '@/lib/data/specialtiesHeader';
import AboutContentForm from '@/components/admin/AboutContentForm';

export default async function AboutContentPage() {
  const [content, specialtiesHeader] = await Promise.all([
    getAboutPageContent(),
    getSpecialtiesHeader(),
  ]);

  return <AboutContentForm initialContent={content} specialtiesHeader={specialtiesHeader} />;
}
