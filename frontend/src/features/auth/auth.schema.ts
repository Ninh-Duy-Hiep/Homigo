import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const LoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().min(1, t("Validation.emailRequired")).email(t("Validation.emailInvalid")),
    password: z.string().min(1, t("Validation.passwordRequired")),
    rememberMe: z.boolean().optional(),
  });

export const RegisterGuestSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z.string().min(1, t("Validation.emailRequired")).email(t("Validation.emailInvalid")),
      fullName: z.string().min(1, t("Validation.fullNameRequired")),
      phoneNumber: z.string().min(1, t("Validation.phoneRequired")).regex(phoneRegex, t("Validation.phoneInvalid")),
      password: z.string().min(8, t("Validation.passwordMin")).regex(passwordRegex, t("Validation.passwordRegex")),

      confirmPassword: z.string().min(1, t("Validation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("Validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

export type LoginSchemaType = z.infer<ReturnType<typeof LoginSchema>>;
export type RegisterGuestSchemaType = z.infer<ReturnType<typeof RegisterGuestSchema>>;
export type RegisterGuestRequest = Omit<RegisterGuestSchemaType, "confirmPassword">;
