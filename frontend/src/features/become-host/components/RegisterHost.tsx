"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import IntroSection from "./IntroSection";
import Verification from "./steps/Verification";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RegisterHostProps {
  header: ReactNode;
  footer: ReactNode;
}

export default function RegisterHost({ header, footer }: RegisterHostProps) {
  const { isAuthenticated } = useAuthStore();

  return (
    <main className={cn("min-h-screen flex flex-col", !isAuthenticated && "bg-subtle")}>
      {header}

      <div className={cn("flex-1 ", !isAuthenticated && "flex items-center justify-center")}>
        {!isAuthenticated ? <IntroSection /> : <Verification />}
      </div>

      {footer}
    </main>
  );
}
