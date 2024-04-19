import apiInstance from "@services/axios";
import { ChagePasswordProps, LoginResponse, LoginType } from "./types";

class SettingsService {
  changePassword(values: ChagePasswordProps) {
    const response = apiInstance
      .patch("/admin/change-password", values)
      .then((res) => res.data);
    return response;
  }

  login(values: LoginType) {
    const response = apiInstance
      .post("/admin/login", values)
      .then((res) => res.data as LoginResponse);
    return response;
  }
}

export default new SettingsService();
