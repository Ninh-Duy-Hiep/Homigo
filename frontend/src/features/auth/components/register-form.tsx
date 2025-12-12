'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { RegisterSchema, RegisterSchemaType } from '../types/schema';
import { authApi } from '../api';

export const RegisterForm = () => {
  const router = useRouter();
  const loginToStore = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      loginToStore(data.user, data.accessToken);
      router.back();
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Đăng ký thất bại');
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tên hiển thị</label>
        <input
          {...register('name')}
          className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      <button
        disabled={mutation.isPending}
        type="submit"
        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
      >
        {mutation.isPending ? 'Đang tạo tài khoản...' : 'Đăng ký'}
      </button>
    </form>
  );
};