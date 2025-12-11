import { User } from "@/features/users/types";

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  userName: string;
  email?: string;
  fullName: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (params: LoginPayload) => Promise<void>;
  register: (params: RegisterPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
