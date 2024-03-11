import apiInstance from "../axios";
import { Visitor } from "./types";

class VisitorsService {
  getVisitors() {
    return apiInstance.get("/visitors").then((res) => res.data as Visitor[]);
  }

  async createVisitor(data: Visitor) {
    const response = await apiInstance.post("/visitors", data);
    return response;
  }

  async updateVisitorValidity(id: string, values: { isValidUser: boolean }) {
    const response = await apiInstance.patch(`/visitors/${id}`, values);
    return response;
  }
}

export default new VisitorsService();
