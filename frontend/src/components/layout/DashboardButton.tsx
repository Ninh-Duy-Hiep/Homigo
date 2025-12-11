'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { UserRole } from '@/lib/constants';

export const DashboardButton = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === UserRole.ADMIN) {
    return (
      <Link href="/admin">
        <Button variant="destructive">
           Trang quản trị Admin
        </Button>
      </Link>
    );
  }

  if (user.role === UserRole.HOST) {
    return (
      <Link href="/host">
        <Button variant="outline">
           Quản lý nhà cho thuê
        </Button>
      </Link>
    );
  }

  return null;
};