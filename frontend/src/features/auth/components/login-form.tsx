"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { authApi } from "../api"; // Đảm bảo import đúng file đã sửa ở Bước 2
import { LoginSchema, LoginSchemaType } from "../types/schema";
import { ApiSuccessResponse, ApiErrorResponse } from "@/types/api";
import { AxiosError } from "axios";
import { LoginResponse } from "../types"; // Import type LoginResponse

export const LoginForm = () => {
  const router = useRouter();
  const loginToStore = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const mutation = useMutation<
    ApiSuccessResponse<LoginResponse>,
    AxiosError<ApiErrorResponse>,
    LoginSchemaType
  >({
    mutationFn: async (data) => {
      const res = await authApi.login(data);

      if (!res.success) {
        throw {
          response: {
            data: res,
          },
        } as AxiosError<ApiErrorResponse>;
      }

      return res;
    },

    onSuccess: (response) => {
      const { user, accessToken } = response.data;

      const safeUser = {
        ...user,
        name: user.name ?? user.email.split("@")[0] ?? "",
      };

      loginToStore(safeUser, accessToken);
      router.back();
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Đăng nhập thất bại";

      alert(Array.isArray(message) ? message.join(", ") : message);
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      {/* UI giữ nguyên */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("email")}
          type="email"
          className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500"
          placeholder="email@example.com"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          {...register("password")}
          type="text"
          className="mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <button
        disabled={mutation.isPending}
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {mutation.isPending ? "Đang xử lý..." : "Đăng nhập"}
      </button>
    </form>
  );
};
