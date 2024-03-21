import { useMutation } from "react-query";
import settingsService from "../services/settings.service";
import { ChagePasswordProps } from "../services/settings.service/types";

export const useChangePassword = () => {
  return useMutation((values: ChagePasswordProps) =>
    settingsService.changePassword(values)
  );
};
