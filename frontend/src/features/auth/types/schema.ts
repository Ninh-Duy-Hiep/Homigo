import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const LoginSchema = z.object({
  email: z.string().min(1, "Email không được để trống").email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
  rememberMe: z.boolean().optional(),
});

export const RegisterGuestSchema = z.object({
  email: z.string().min(1, "Email không được để trống").email("Email không hợp lệ"),
  fullName: z.string().min(1, "Họ tên không được để trống"),
  phoneNumber: z.string()
    .min(1, "Số điện thoại không được để trống")
    .regex(phoneRegex, "Số điện thoại không hợp lệ (VN)"),
  password: z.string()
    .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
    .regex(passwordRegex, "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 ký tự đặc biệt"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterGuestSchemaType = z.infer<typeof RegisterGuestSchema>;