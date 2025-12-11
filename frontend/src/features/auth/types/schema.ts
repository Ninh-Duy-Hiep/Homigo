import * as z from "zod";

const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Vui lòng nhập đúng định dạng email" })
    .min(1, { message: "Please enter your email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(strongPasswordRegex, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

export const registerSchema = z.object({
  userName: z.string().min(1, { message: "Please enter your username" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  fullName: z.string().min(1, { message: "Please enter your full name" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(strongPasswordRegex, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
  }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
