"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, UserRoundPen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { registerSchema, RegisterSchemaType } from "../types/schema";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/axios";
import { CustomInput, SocialIcon } from "./auth-ui";
import { Chrome, Facebook, Github, Linkedin } from "lucide-react";

interface RegisterFormProps {
  onSuccess: () => void; // Callback để báo cho trang cha biết đăng ký xong để chuyển tab
  isActive: boolean;     // Prop để reset form khi ẩn hiện
}

export function RegisterForm({ onSuccess, isActive }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerAuth } = useAuth();
  const { success, error } = useToast();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", userName: "", email: "", password: "" },
  });

  // Reset form khi tab chuyển đổi
  useEffect(() => {
    if (!isActive) form.reset();
  }, [isActive, form]);

  async function onSubmit(values: RegisterSchemaType) {
    setIsLoading(true);
    try {
      await registerAuth({
        userName: values.userName,
        email: values.email,
        fullName: values.fullName,
        password: values.password,
      });
      success("Success", { description: "Registration successful!" });
      onSuccess(); // Gọi callback để chuyển về màn login
    } catch (err) {
      error("Error", { description: getErrorMessage(err) });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white flex flex-col items-center justify-center h-full px-10 text-center"
      noValidate
    >
      <h1 className="text-4xl font-bold mb-4">Register</h1>
      <div className="w-full space-y-3">
        <CustomInput
          icon={<UserRoundPen className="w-5 h-5" />}
          placeholder="FullName"
          register={form.register("fullName")}
        />
        {form.formState.errors.fullName && (
          <p className="text-red-500 text-sm text-start">{form.formState.errors.fullName.message}</p>
        )}
        <CustomInput
          icon={<User className="w-5 h-5" />}
          placeholder="UserName"
          register={form.register("userName")}
        />
        {form.formState.errors.userName && (
          <p className="text-red-500 text-sm text-start">{form.formState.errors.userName.message}</p>
        )}
        <CustomInput
          icon={<Mail className="w-5 h-5" />}
          placeholder="Email"
          type="email"
          register={form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm text-start">{form.formState.errors.email.message}</p>
        )}
        <CustomInput
          icon={
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="w-5 h-5 cursor-pointer" /> : <Eye className="w-5 h-5 cursor-pointer" />}
            </div>
          }
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          register={form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm text-start">{form.formState.errors.password.message}</p>
        )}
      </div>

      <Button className="mt-6 w-full bg-[#512da8] hover:bg-[#5c6bc0] uppercase font-bold tracking-wider cursor-pointer">
        Register
      </Button>

      <div className="flex space-x-3 mt-5">
        <SocialIcon icon={<Chrome className="w-5 h-5" />} />
        <SocialIcon icon={<Facebook className="w-5 h-5" />} />
        <SocialIcon icon={<Github className="w-5 h-5" />} />
        <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
      </div>
    </form>
  );
}