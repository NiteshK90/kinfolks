import apiInstance from "@services/axios";
import { User } from "./types";

class UsersService {
  getUsers() {
    return apiInstance.get("/users").then((res) => res.data as User[]);
  }

  deleteUser(id: string) {
    const response = apiInstance.delete(`/users/${id}`).then((res) => res.data);
    return response;
  }
}

export default new UsersService();
