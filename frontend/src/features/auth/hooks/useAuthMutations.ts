import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/axios";
import { LoginSchemaType } from "../types/schema";

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data, variables: LoginSchemaType) => {
      const shouldRemember = variables.rememberMe ?? false;
      if (data?.data == null) return;
      const { user, accessToken } = data.data;

      loginStore(user, accessToken, shouldRemember);

      router.push("/");
    },
    onError: (error) => {
      alert(getErrorMessage(error));
    },
  });
};

export const useRegisterGuest = () => {
  const loginStore = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.registerGuest,
    onSuccess: (data) => {
      if (data?.data == null) return;

      const { user, accessToken } = data.data;
      loginStore(user, accessToken, false);

      router.push("/");
    },
    onError: (error) => {
      alert(getErrorMessage(error));
    },
  });
};
