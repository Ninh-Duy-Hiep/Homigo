import axiosInstance from "@/lib/axios";
import { ApiSuccessResponse } from "@/types/api";
import { LoginPayload, LoginResponse, RegisterPayload } from "@/features/auth/types/auth";

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await axiosInstance.post<ApiSuccessResponse<LoginResponse>>("/auth/login", payload);
    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await axiosInstance.post<ApiSuccessResponse<LoginResponse>>("/auth/register", payload);
    return response.data;
  },

  logout: async () => {
    return await axiosInstance.post<ApiSuccessResponse<void>>("/auth/logout");
  },
};
