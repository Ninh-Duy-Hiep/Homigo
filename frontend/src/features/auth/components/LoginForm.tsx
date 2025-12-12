"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../types/schema";
import { useLogin } from "../hooks/useAuthMutations";
import { motion } from "motion/react";

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input 
          {...register("email")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="user@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mật khẩu</label>
        <input 
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="********"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="remember"
          {...register("rememberMe")}
          className="rounded border-gray-300"
        />
        <label htmlFor="remember" className="text-sm">Ghi nhớ đăng nhập</label>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
      >
        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </motion.form>
  );
};