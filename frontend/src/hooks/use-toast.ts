import { useMemo } from "react";
import { toast, type ExternalToast } from "sonner";

const DEFAULT_DURATION = 5000;

export function useToast() {
  return useMemo(
    () => ({
      success: (message: string | React.ReactNode, options?: ExternalToast) => {
        return toast.success(message, {
          duration: DEFAULT_DURATION,
          ...options,
        });
      },

      error: (message: string | React.ReactNode, options?: ExternalToast) => {
        return toast.error(message, {
          duration: DEFAULT_DURATION,
          ...options,
        });
      },

      info: (message: string | React.ReactNode, options?: ExternalToast) => {
        return toast.info(message, {
          duration: DEFAULT_DURATION,
          ...options,
        });
      },

      warning: (message: string | React.ReactNode, options?: ExternalToast) => {
        return toast.warning(message, {
          duration: DEFAULT_DURATION,
          ...options,
        });
      },

      loading: (message: string | React.ReactNode, options?: ExternalToast) => {
        return toast.loading(message, {
          ...options,
        });
      },

      toast,
      dismiss: (toastId?: string | number) => toast.dismiss(toastId),
    }),
    []
  );
}
