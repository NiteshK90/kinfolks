import apiInstance from "../axios";
import { Locations } from "./types";

class LocationService {
  async createLocationWithPlaces(data: Locations) {
    const response = await apiInstance.post("/", data);
    return response;
  }
}

export default new LocationService();
