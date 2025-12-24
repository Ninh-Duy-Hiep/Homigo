"use client";

import { usePathname } from "@/i18n/routing";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export default function RouteTracker() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !pathname.includes("/auth")) {
      sessionStorage.setItem("prevUrl", pathname);
    }
  }, [pathname, isAuthenticated]);

  return null;
}
