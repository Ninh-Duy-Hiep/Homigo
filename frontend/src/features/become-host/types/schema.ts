import { z } from "zod";

export const EmailVerificationSchema = z.object({
  email: z.string().min(1,"Vui lòng nhập email").email("Email không hợp lệ"),
});

export const OtpVerificationSchema = z.object({
  otp: z.string().length(6, "Mã OTP phải có 6 chữ số"),
});

export type EmailVerificationSchemaType = z.infer<typeof EmailVerificationSchema>;
export type OtpVerificationSchemaType = z.infer<typeof OtpVerificationSchema>;
