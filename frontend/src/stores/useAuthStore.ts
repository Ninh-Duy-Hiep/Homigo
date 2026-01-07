import { UserAuth } from "@/features/auth/auth.types";
import { create } from "zustand";

interface AuthState {
  user: UserAuth | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: UserAuth, token: string, rememberMe: boolean) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token, rememberMe) => {
    set({ user, token, isAuthenticated: true });

    const userStr = JSON.stringify(user);

    if (rememberMe) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("homigo-auth", userStr);

      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("homigo-auth");
    } else {
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("homigo-auth", userStr);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("homigo-auth");
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("homigo-auth");

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("homigo-auth");
  },

  initialize: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    const userStr = localStorage.getItem("homigo-auth") || sessionStorage.getItem("homigo-auth");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        console.error("Failed to parse user from storage:", error);
        localStorage.removeItem("homigo-auth");
        sessionStorage.removeItem("homigo-auth");
      }
    }
  },
}));
