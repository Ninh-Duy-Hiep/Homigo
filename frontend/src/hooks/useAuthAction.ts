import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuthAction = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const execute = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      const isConfirmed = window.confirm(
        "Tính năng này yêu cầu đăng nhập. Bạn có muốn chuyển đến trang đăng nhập không?"
      );
      
      if (isConfirmed) {
        router.push('/auth');
      }
    }
  };

  return { execute };
};