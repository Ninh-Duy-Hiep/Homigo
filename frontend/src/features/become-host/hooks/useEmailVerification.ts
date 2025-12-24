import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { authApi } from "@/features/auth/api";
import { getErrorMessage } from "@/lib/axios";
import { 
  EmailVerificationSchema, 
  EmailVerificationSchemaType, 
  OtpVerificationSchema, 
  OtpVerificationSchemaType 
} from "../types/schema";

export const useEmailVerification = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [targetEmail, setTargetEmail] = useState("");
  const { toast } = useToast();
  
  const searchParams = useSearchParams();
  const codeParam = searchParams.get("code");
  const emailParam = searchParams.get("email");

  const emailForm = useForm<EmailVerificationSchemaType>({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      email: emailParam || "",
    },
  });

  const otpForm = useForm<OtpVerificationSchemaType>({
    resolver: zodResolver(OtpVerificationSchema),
    defaultValues: {
      otp: codeParam || "",
    },
  });

  useEffect(() => {
    if (codeParam && emailParam) {
      setTargetEmail(emailParam);
      setStep(2);
    }
  }, [codeParam, emailParam]);

  const onSendOtp = async (data: EmailVerificationSchemaType) => {
    setLoading(true);
    try {
      await authApi.sendOtp({ newEmail: data.email });
      setTargetEmail(data.email);
      setStep(2);
      toast({
        title: "Thành công",
        description: "Mã OTP đã được gửi đến email của bạn.",
        type: "success",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
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
        title: "Xác thực thành công",
        description: "Email của bạn đã được xác minh.",
        type: "success",
      });
    } catch (error) {
      toast({
        title: "Xác thực thất bại",
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
        title: "Đã gửi lại",
        description: "Mã OTP mới đã được gửi.",
        type: "success",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: getErrorMessage(error),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    loading,
    targetEmail,
    emailForm,
    otpForm,
    onSendOtp,
    onVerifyOtp,
    handleResendOtp
  };
};
