"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../types/schema";
import { useLogin } from "../hooks/useAuthMutations";
import { motion } from "motion/react";
import { CustomInput } from "./ui";
import { Eye, EyeOff, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const LoginForm = () => {
  const t = useTranslations("Auth");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema(t)),
  });

  const rememberMe = useWatch({ control, name: "rememberMe" });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 text-sm"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-3xl font-bold">{t("login")}</h1>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <CustomInput icon={<User className="w-5 h-5" />} placeholder="abc@gmail.com" register={register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <CustomInput
          icon={
            showPassword ? (
              <Eye className="w-5 h-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <EyeOff className="w-5 h-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
            )
          }
          type={showPassword ? "text" : "password"}
          placeholder="********"
          register={register("password")}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Checkbox
            id="rememberMe"
            defaultChecked={rememberMe}
            onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)}
            className="cursor-pointer border-gray-500"
          />
          <Label htmlFor="rememberMe" className="cursor-pointer text-muted-foreground">
            {t("rememberMe")}
          </Label>
        </div>

        <Link href={"#"} className="text-blue-600">
          {t("forgotPassword")}
        </Link>
      </div>

      <Button type="submit" className="w-full py-2 cursor-pointer" disabled={isPending}>
        {isPending ? t("loginLoading") : t("loginButton")}
      </Button>

      <div className="my-2 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500">{t("or")}</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <Button type="button" variant="nothing" className="w-full cursor-pointer font-bold" disabled={isPending}>
        <FcGoogle className="h-5 w-5" />
        {t("continueWithGoogle")}
      </Button>

      <div className="flex justify-center items-center gap-1">
        <p className="text-muted-foreground">{t("noAccount")}</p>
        <Link href={"/auth/register"} className="text-blue-600 font-semibold">
          {t("register")}
        </Link>
      </div>
    </motion.form>
  );
};
