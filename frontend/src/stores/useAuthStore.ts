import { UserAuth } from "@/features/auth/types";
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
      localStorage.setItem("user", userStr);

      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("user", userStr);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
  },

  initialize: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      } catch (e) {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
    }
  },
}));
