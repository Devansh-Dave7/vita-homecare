import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/session';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await getAdminUser();
  
  // Redirect to login if not authenticated or not admin
  if (!adminUser) {
    redirect('/admin/login');
  }
  
  return <>{children}</>;
}
