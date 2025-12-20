"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterGuestSchema, RegisterGuestSchemaType } from "../types/schema";
import { useRegisterGuest } from "../hooks/useAuthMutations";
import { motion } from "motion/react";
import { CustomInput } from "./ui";
import { Eye, EyeOff, Mail, User, UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export interface RegisterGuestFormProps {
  onSuccess?: () => void;
}

export const RegisterGuestForm = ({ onSuccess }: RegisterGuestFormProps) => {
  const t = useTranslations("Auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterGuestSchemaType>({
    resolver: zodResolver(RegisterGuestSchema(t)),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useRegisterGuest();

  const onSubmit = (data: RegisterGuestSchemaType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = data;

    mutate(payload, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 text-sm"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-3xl font-bold">{t("register")}</h1>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">{t("fullName")}</Label>
        <CustomInput
          icon={<UserRoundPen className="w-5 h-5" />}
          placeholder="Nguyễn Văn A"
          register={register("fullName")}
        />
        {errors.fullName && <p className="text-red-500 text-sm text-start">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <CustomInput
          icon={<Mail className="w-5 h-5" />}
          placeholder="Email"
          type="email"
          register={register("email")}
        />

        {errors.email && <p className="text-red-500 text-sm text-start">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
        <CustomInput
          icon={<User className="w-5 h-5" />}
          placeholder="Số điện thoại"
          register={register("phoneNumber")}
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm text-start">{errors.phoneNumber.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <CustomInput
          icon={
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff className="w-5 h-5 cursor-pointer" />
              ) : (
                <Eye className="w-5 h-5 cursor-pointer" />
              )}
            </div>
          }
          placeholder={t("password")}
          type={showPassword ? "text" : "password"}
          register={register("password")}
        />
        {errors.password && <p className="text-red-500 text-sm text-start">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <CustomInput
          icon={
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5 cursor-pointer" />
              ) : (
                <Eye className="w-5 h-5 cursor-pointer" />
              )}
            </div>
          }
          placeholder={t("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          register={register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm text-start">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full py-2 cursor-pointer" disabled={isPending}>
        {isPending ? t("registerLoading") : t("registerButton")}
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
        <p className="text-muted-foreground">{t("hasAccount")}</p>
        <Link href={"/auth/login"} className="text-blue-600 font-semibold">
          {t("login")}
        </Link>
      </div>
    </motion.form>
  );
};
