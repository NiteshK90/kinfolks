import apiInstance from "../axios";
import { Locations } from "./types";

class LocationService {
  async createLocationWithPlaces(data: Locations) {
    const response = await apiInstance.post("/locations", data);
    return response;
  }

  async getLocations() {
    return apiInstance.get("/locations").then((res) => res.data as Locations[]);
  }
}

export default new LocationService();
