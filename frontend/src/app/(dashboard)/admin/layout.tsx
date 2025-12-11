'use client';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { UserRole } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== UserRole.ADMIN) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== UserRole.ADMIN) return <div>Loading...</div>;

  return (
    <div className="admin-layout flex">
      <aside>Sidebar Admin</aside>
      <main>{children}</main>
    </div>
  );
}