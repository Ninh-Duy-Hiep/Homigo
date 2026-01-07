import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { LoginSchemaType, RegisterGuestRequest } from "./auth.schema";
import { AuthResponse, SendOtpRequest, VerifyOtpRequest } from "./auth.types";

export const authApi = {
  login: async (data: LoginSchemaType) => {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
    return response.data;
  },

  registerGuest: async (data: RegisterGuestRequest) => {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/register/guest", data);
    return response.data;
  },

  sendOtp: async (data: SendOtpRequest) => {
    const response = await api.post<ApiResponse<{ message: string }>>("/auth/send-verification-otp", data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest) => {
    const response = await api.post<ApiResponse<{ message: string }>>("/auth/verify-otp", data);
    return response.data;
  },
};
