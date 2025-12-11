"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/api/auth.service";
import { AuthContextType, LoginPayload, RegisterPayload } from "@/features/auth/types/auth";
import { User } from "@/features/users/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        const storedToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res = await authService.login(payload);

      if (res.success) {
        const { accessToken, user } = res.data;
        const userString = JSON.stringify(user);

        setUser(user);

        if (payload.rememberMe) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("user", userString);
        } else {
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("user", userString);
        }

        router.push("/dashboard");
      } else {
        throw new Error(typeof res.message === "string" ? res.message : "Login failed");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      await authService.register(payload);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await authService.logout();
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      router.push("/login");

      setTimeout(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        setUser(null);
      }, 50);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
