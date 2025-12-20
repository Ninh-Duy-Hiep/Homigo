import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { toast as sonnerToast, type ExternalToast } from "sonner";

const DEFAULT_DURATION = 5000;

type ToastType = "success" | "error" | "info" | "warning" | "loading";

interface ToastOptions {
  type?: ToastType;
  title: string;
  description?: string;
  options?: ExternalToast;
}

const typeStyleMap: Record<ToastType, string> = {
  success: "!bg-green-100 !text-green-700 !border-green-200",
  error: "!bg-red-100 !text-red-700 !border-red-200",
  warning: "!bg-orange-100 !text-orange-700 !border-orange-200",
  info: "!bg-blue-100 !text-blue-700 !border-blue-200",
  loading: "",
};

export function useToast() {
  const toast = useCallback(({ type = "info", title, description, options }: ToastOptions) => {
    const content = (
      <div className="flex flex-col gap-1">
        <span className="font-medium">{title}</span>
        {description && <span className="text-sm opacity-90">{description}</span>}
      </div>
    );

    return sonnerToast[type](content, {
      duration: type === "loading" ? undefined : DEFAULT_DURATION,
      className: cn(typeStyleMap[type], options?.className),
      ...options,
    });
  }, []);

  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
}
