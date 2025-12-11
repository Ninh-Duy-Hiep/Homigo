'use client';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { UserRole } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HostLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== UserRole.HOST) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== UserRole.HOST) return <div>Loading...</div>;

  return (
    <div className="host-layout flex">
      <aside>Sidebar Host</aside>
      <main>{children}</main>
    </div>
  );
}