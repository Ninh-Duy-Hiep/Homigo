"use client";

import { useState } from "react";
import { LoginForm } from "@/features/auth/components/login-form";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div
        className={`relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-200
          ${isRegister ? "active" : ""} 
        `}
      >
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out z-10
            ${isRegister ? "translate-x-full opacity-100 visible" : "left-0 opacity-0 invisible"}
          `}
        >
          <RegisterForm onSuccess={() => setIsRegister(false)} isActive={isRegister} />
        </div>

        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out z-20
            ${isRegister ? "translate-x-full opacity-0 invisible" : "left-0"}
          `}
        >
          <LoginForm />
        </div>

        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-1000 ease-in-out z-50 rounded-l-[150px]
            ${isRegister ? "-translate-x-full rounded-l-none rounded-r-[150px]" : ""}
          `}
        >
          <div
            className={`bg-linear-to-r from-[#5c6bc0] to-[#512da8] text-white relative -left-full h-full w-[200%] transform transition-transform duration-1000 ease-in-out
              ${isRegister ? "translate-x-1/2" : "translate-x-0"}
            `}
          >
            <div
              className={`absolute top-0 flex flex-col items-center justify-center w-1/2 h-full px-8 text-center transition-transform duration-1000 ease-in-out
                ${isRegister ? "translate-x-0" : "-translate-x-[200%]"}
              `}
            >
              <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-6">Already have an account?</p>
              <button
                onClick={() => setIsRegister(false)}
                className="cursor-pointer bg-transparent border border-white text-white py-2 px-10 rounded-lg font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Login
              </button>
            </div>

            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center w-1/2 h-full px-8 text-center transition-transform duration-1000 ease-in-out
                ${isRegister ? "translate-x-[200%]" : "translate-x-0"}
              `}
            >
              <h1 className="text-4xl font-bold mb-4">Hello, Welcome!</h1>
              <p className="mb-6">Don&apos;t have an account?</p>
              <button
                onClick={() => setIsRegister(true)}
                className="cursor-pointer bg-transparent border border-white text-white py-2 px-10 rounded-lg font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}