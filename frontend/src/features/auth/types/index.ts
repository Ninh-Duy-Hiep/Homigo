import { HostStatus } from "@/constants/enum";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterGuestPayload {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface RegisterHostPayload {
  email: string;
  password: string;
  fullName: string;
  bio?: string;
  phoneNumber: string;
  indentityCardUrl: string;
}

export interface AuthResponse {
  message: string;
  user: UserAuth;
  accessToken: string;
}

export interface UserAuth {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatar: string | null;
  hostStatus: HostStatus;
  phoneNumber?: string;
  identityCardUrl?: string;
  bio?: string;
  rejectionReason?: string;
}
