import { useMutation, useQuery } from "react-query";
import usersService from "../services/users.service";

export const useGetUsers = () => {
  return useQuery([], async () => {
    return await usersService.getUsers();
  });
};

export const useDeleteUser = () => {
  return useMutation(usersService.deleteUser);
};
