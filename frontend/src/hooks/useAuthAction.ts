import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/axios";
import { LoginSchemaType } from "@/features/auth/types/schema";

export const useAuthAction = () => {
  const loginStore = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data, variables: LoginSchemaType) => {
      const isRemember = variables.rememberMe ?? false;

      if (!data?.data) return;
      const { user, accessToken } = data.data;

      loginStore(user, accessToken, isRemember);

      router.push("/");
    },
    onError: (error) => {
      alert(getErrorMessage(error));
    },
  });
};
