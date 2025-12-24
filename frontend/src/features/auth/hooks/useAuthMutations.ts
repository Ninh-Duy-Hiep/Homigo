import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "@/i18n/routing";
import { getErrorMessage } from "@/lib/axios";
import { LoginSchemaType } from "../types/schema";
import { useToast } from "@/hooks/useToast";
import { useTranslations } from "next-intl";

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("Auth");

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data, variables: LoginSchemaType) => {
      const shouldRemember = variables.rememberMe ?? false;
      if (data?.data == null) return;
      const { user, accessToken } = data.data;

      loginStore(user, accessToken, shouldRemember);

      toast({
        type: "success",
        title: t("toast.success.title"),
        description: t("toast.success.description"),
      });

      const redirectUrl = sessionStorage.getItem("prevUrl");
      if (redirectUrl) {
        sessionStorage.removeItem("prevUrl");
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      toast({
        type: "error",
        title: t("toast.error"),
        description: getErrorMessage(error),
      });
    },
  });
};

export const useRegisterGuest = () => {
  const loginStore = useAuthStore((state) => state.login);
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: authApi.registerGuest,
    onSuccess: (data) => {
      if (data?.data == null) return;

      const { user, accessToken } = data.data;
      loginStore(user, accessToken, false);

      toast({
        type: "success",
        title: "Đăng ký thành công",
        description: "Bạn đã đăng ký thành công",
      });

      router.push("/");
    },
    onError: (error) => {
      toast({
        type: "error",
        title: "Đăng ký thất bại",
        description: getErrorMessage(error),
      });
    },
  });
};
