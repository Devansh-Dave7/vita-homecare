import { getStaffMemberById } from '@/lib/data/about';
import EditStaffClient from '@/components/admin/EditStaffClient';
import { notFound } from 'next/navigation';

interface EditStaffMemberPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditStaffMemberPage({ params }: EditStaffMemberPageProps) {
  const { id } = await params;
  const staffMember = await getStaffMemberById(id);

  if (!staffMember) {
    notFound();
  }

  return <EditStaffClient staffMember={staffMember} />;
}
