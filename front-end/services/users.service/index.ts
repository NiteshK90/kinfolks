import apiInstance from "../axios";
import { User } from "./types";

class UsersService {
  getUsers() {
    return apiInstance.get("/users").then((res) => res.data as User[]);
  }
}

export default new UsersService();
