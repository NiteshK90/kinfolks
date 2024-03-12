import { useMutation, useQuery } from "react-query";
import visitorsService from "../services/visitors.service";
import { Visitor } from "../services/visitors.service/types";

export const useGetVisitors = () => {
  return useQuery([], async () => {
    return await visitorsService.getVisitors();
  });
};

export const useCreateVisitor = () => {
  return useMutation((values: Visitor) =>
    visitorsService.createVisitor(values)
  );
};

export const useUpdateVisitorValidity = () => {
  return useMutation(
    ({ id, values }: { id: string; values: { isValidVisitor: boolean } }) =>
      visitorsService.updateVisitorValidity(id, values)
  );
};
