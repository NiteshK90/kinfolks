import { useQuery } from "react-query";
import usersService from "../services/users.service";

export const useGetUsers = () => {
  return useQuery([], async () => {
    return await usersService.getUsers();
  });
};
