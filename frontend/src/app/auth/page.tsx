'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from '@/features/auth/components/login-form';
import { RegisterForm } from '@/features/auth/components/register-form';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex bg-gray-200 p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition-all ${
              isLogin ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition-all ${
              !isLogin ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Đăng ký
          </button>
        </div>

        <div className="p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            {isLogin ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}