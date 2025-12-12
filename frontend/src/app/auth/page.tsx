"use client";

import { useState } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterGuestForm } from "@/features/auth/components/RegisterGuestForm";
import { motion, AnimatePresence } from "motion/react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? "Chào mừng trở lại!" : "Tạo tài khoản mới"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500">
              {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
            </button>
          </p>
        </div>

        <div className="mt-8">
          {/* Sử dụng AnimatePresence để tạo hiệu ứng chuyển đổi mượt mà */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div key="login" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div key="register" exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
                <RegisterGuestForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
