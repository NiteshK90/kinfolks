import apiInstance from "../axios";
import { ChagePasswordProps } from "./types";

class SettingsService {
  changePassword(values: ChagePasswordProps) {
    const response = apiInstance
      .patch("/admin/change-password", values)
      .then((res) => res.data);
    return response;
  }
}

export default new SettingsService();
