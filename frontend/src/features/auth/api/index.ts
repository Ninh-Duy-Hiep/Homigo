import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { LoginSchemaType, RegisterGuestRequest } from "../types/schema";
import { AuthResponse } from "../types";

export const authApi = {
  login: async (data: LoginSchemaType) => {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
    return response.data;
  },

  registerGuest: async (data: RegisterGuestRequest) => {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/register/guest", data);
    return response.data;
  },
};