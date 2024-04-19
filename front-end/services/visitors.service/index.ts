import apiInstance from "@services/axios";
import { Visitor } from "./types";

class VisitorsService {
  getVisitors() {
    return apiInstance.get("/visitors").then((res) => res.data as Visitor[]);
  }

  async createVisitor(data: Visitor) {
    const response = await apiInstance.post("/visitors", data);
    return response;
  }

  async updateVisitorValidity(id: string, values: { isValidVisitor: boolean }) {
    const response = await apiInstance.patch(`/visitors/${id}`, values);
    return response;
  }

  async deleteVisitor(id: string) {
    const response = await apiInstance.delete(`/visitors/${id}`);
    return response;
  }
}

export default new VisitorsService();
