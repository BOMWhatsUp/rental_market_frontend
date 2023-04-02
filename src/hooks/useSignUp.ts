import { useMutation } from "react-query";
import { isExistInfoCheck, postSignUp } from "../api/signUp/signUpAPI";
import { signUpInfo } from "../pages/SignUpPage";

export const useSignUp = () => {
  const checkMutation = useMutation({
    mutationFn: (data: { key: string; value: string }) =>
      isExistInfoCheck(data),
  });

  const createMutation = useMutation({
    mutationFn: (data: signUpInfo) => postSignUp(data),
  });

  return {
    checkMutation,
    createMutation,
  };
};
