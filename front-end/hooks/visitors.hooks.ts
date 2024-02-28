import { useQuery } from "react-query";
import visitorsService from "../services/visitors.service";

export const useGetVisitors = () => {
  return useQuery([], async () => {
    return await visitorsService.getVisitors();
  });
};
