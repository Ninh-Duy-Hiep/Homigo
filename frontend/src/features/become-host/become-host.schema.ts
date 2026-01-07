import { z } from "zod";

export const EmailVerificationSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
  });

export const OtpVerificationSchema = (t: (key: string) => string) =>
  z.object({
    otp: z.string().length(6, t("otpLength")),
  });

export type EmailVerificationSchemaType = z.infer<ReturnType<typeof EmailVerificationSchema>>;
export type OtpVerificationSchemaType = z.infer<ReturnType<typeof OtpVerificationSchema>>;
