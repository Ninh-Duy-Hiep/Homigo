"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterGuestSchema, RegisterGuestSchemaType } from "../types/schema";
import { useRegisterGuest } from "../hooks/useAuthMutations";
import { motion } from "motion/react";

export const RegisterGuestForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterGuestSchemaType>({
    resolver: zodResolver(RegisterGuestSchema),
  });

  const { mutate, isPending } = useRegisterGuest();

  const onSubmit = (data: RegisterGuestSchemaType) => {
    mutate(data);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Họ và tên</label>
        <input 
          {...register("fullName")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Nguyễn Văn A"
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input 
          {...register("email")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="email@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
        <input 
          {...register("phoneNumber")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="0912345678"
        />
        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
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

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isPending ? "Đang xử lý..." : "Đăng ký Khách"}
      </button>
    </motion.form>
  );
};