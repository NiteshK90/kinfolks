import { useMutation, useQuery } from "react-query";
import { Locations } from "../services/locations.service/types";
import locationsService from "../services/locations.service";

export const useCreateLocationWithPlaces = () => {
  return useMutation((values: Locations) =>
    locationsService.createLocationWithPlaces(values)
  );
};

export const useGetLocations = () => {
  return useQuery([], async () => {
    return await locationsService.getLocations();
  });
};
