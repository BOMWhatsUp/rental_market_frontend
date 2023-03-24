import { useMutation } from "react-query";
import { onLogin, onSilentRefresh } from "../api/login/loginAPI";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => onLogin(data),
  });

  const silentRefreshMutation = useMutation({
    mutationFn: () => onSilentRefresh(),
  });

  return {
    loginMutation,
    silentRefreshMutation,
  };
};
