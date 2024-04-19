import { useMutation } from "react-query";
import settingsService from "@services/settings.service";
import {
  ChagePasswordProps,
  LoginType,
} from "@services/settings.service/types";

export const useChangePassword = () => {
  return useMutation((values: ChagePasswordProps) =>
    settingsService.changePassword(values)
  );
};

export const useLogin = () => {
  return useMutation((values: LoginType) => settingsService.login(values));
};
