"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { motion } from "motion/react"; 
import { LogOut, User } from "lucide-react";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    window.location.href = "/auth";
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Homigo
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/rooms" className="hover:text-blue-600 transition">Phòng thuê</Link>
          <Link href="/about" className="hover:text-blue-600 transition">Giới thiệu</Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Hi, {user.fullName || user.email}</span>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                title="Đăng xuất"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Đăng nhập / Đăng ký
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};