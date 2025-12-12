import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { LoginResponse } from "../types";
import { LoginSchemaType, RegisterSchemaType } from "../types/schema";

export const authApi = {
  login: async (data: LoginSchemaType) => {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/login", data);
    return response.data;
  },

//   register: async (data: RegisterSchemaType) => {
//     const { confirmPassword, ...registerData } = data;
//     const response = await api.post<ApiResponse<User>>("/auth/register", registerData);
//     return response.data;
//   },
};
