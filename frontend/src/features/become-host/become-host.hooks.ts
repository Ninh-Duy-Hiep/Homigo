import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { authApi } from "@/features/auth/auth.service";
import { getErrorMessage } from "@/lib/axios";
import {
  EmailVerificationSchema,
  EmailVerificationSchemaType,
  OtpVerificationSchema,
  OtpVerificationSchemaType,
} from "./become-host.schema";

import { useTranslations } from "next-intl";

export const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const t = useTranslations("BecomeHost");
  const tValidation = useTranslations("BecomeHost.validation");

  const emailParam = searchParams.get("email");
  const codeParam = searchParams.get("code");
  const stepParam = searchParams.get("step");

  const targetEmail = emailParam || "";

  const step = (codeParam && emailParam) || (emailParam && stepParam === "verify") ? 2 : 1;

  const emailForm = useForm<EmailVerificationSchemaType>({
    resolver: zodResolver(EmailVerificationSchema(tValidation.raw)),
    defaultValues: {
      email: emailParam || "",
    },
  });

  const otpForm = useForm<OtpVerificationSchemaType>({
    resolver: zodResolver(OtpVerificationSchema(tValidation.raw)),
    defaultValues: {
      otp: codeParam || "",
    },
  });

  useEffect(() => {
    if (emailParam) {
      emailForm.setValue("email", emailParam);
    }
    if (codeParam) {
      otpForm.setValue("otp", codeParam);
    }
  }, [emailParam, codeParam, emailForm, otpForm]);

  const onSendOtp = async (data: EmailVerificationSchemaType) => {
    setLoading(true);
    try {
      await authApi.sendOtp({ newEmail: data.email });

      const params = new URLSearchParams(searchParams.toString());
      params.set("email", data.email);
      params.set("step", "verify");
      router.replace(`${pathname}?${params.toString()}`);

      toast({
        title: t("toast.success"),
        description: t("toast.otpSent"),
        type: "success",
      });
    } catch (error) {
      toast({
        title: t("toast.error"),
        description: getErrorMessage(error),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async (data: OtpVerificationSchemaType) => {
    setLoading(true);
    try {
      await authApi.verifyOtp({ code: data.otp });
      toast({
        title: t("toast.verifySuccess"),
        description: t("toast.otpVerified"),
        type: "success",
      });
    } catch (error) {
      toast({
        title: t("toast.verifyFailed"),
        description: getErrorMessage(error),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!targetEmail) return;
    setLoading(true);
    try {
      await authApi.sendOtp({ newEmail: targetEmail });
      toast({
        title: t("toast.resendSuccess"),
        description: t("toast.resendDesc"),
        type: "success",
      });
    } catch (error) {
      toast({
        title: t("toast.error"),
        description: getErrorMessage(error),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const changeEmail = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("step");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    step,
    setStep: (s: 1 | 2) => {
      if (s === 1) changeEmail();
    },
    loading,
    targetEmail,
    emailForm,
    otpForm,
    onSendOtp,
    onVerifyOtp,
    handleResendOtp,
  };
};
