import { getInquirySubmissions } from '@/lib/data/submissions';
import { getAdminUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import InquirySubmissionsClient from './InquirySubmissionsClient';

export default async function InquirySubmissionsPage() {
  const adminUser = await getAdminUser();
  if (!adminUser) {
    redirect('/admin/login');
  }

  const submissions = await getInquirySubmissions();

  return <InquirySubmissionsClient submissions={submissions} />;
}
