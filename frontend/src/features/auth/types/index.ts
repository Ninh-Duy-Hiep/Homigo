export interface LoginResponse {
  accessToken: string;
  user: User;
}
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'HOST' | 'GUEST';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string; // Nếu có
  user: User;
}

export interface LoginPayload {
  email: string;
  password?: string; // Optional vì login Google không cần pass
}