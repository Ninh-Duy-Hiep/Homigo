"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, LoginSchemaType } from "../types/schema";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/axios";
import { CustomInput, SocialIcon } from "./auth-ui";
import { Chrome, Facebook, Github, Linkedin } from "lucide-react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  async function onSubmit(values: LoginSchemaType) {
    setIsLoading(true);
    try {
      await login({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });
      success("Success", { description: "Login successful!" });
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
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <div className="w-full space-y-3">
        <CustomInput
          icon={<User className="w-5 h-5" />}
          placeholder="Email"
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

      <div className="flex items-center justify-between w-full mt-4 text-xs">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={form.watch("rememberMe")}
            onCheckedChange={(val) => form.setValue("rememberMe", val as boolean)}
            className="cursor-pointer"
          />
          <label htmlFor="remember" className="cursor-pointer">Remember me</label>
        </div>
        <a href="#" className="hover:underline">Forgot password?</a>
      </div>

      <Button disabled={isLoading} className="mt-6 w-full bg-[#512da8] hover:bg-[#5c6bc0] uppercase font-bold tracking-wider cursor-pointer text-white">
        {isLoading ? "Processing..." : "Login"}
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