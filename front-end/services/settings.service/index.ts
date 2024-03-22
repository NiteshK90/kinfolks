import apiInstance from "../axios";
import { ChagePasswordProps, LoginType } from "./types";

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
      .then((res) => res.data);
    return response;
  }
}

export default new SettingsService();
