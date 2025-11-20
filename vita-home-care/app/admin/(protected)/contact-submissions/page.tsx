import { getContactSubmissions } from '@/lib/data/submissions';
import { getAdminUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import ContactSubmissionsClient from './ContactSubmissionsClient';

export default async function ContactSubmissionsPage() {
  const adminUser = await getAdminUser();
  if (!adminUser) {
    redirect('/admin/login');
  }

  const submissions = await getContactSubmissions();

  return <ContactSubmissionsClient submissions={submissions} />;
}
