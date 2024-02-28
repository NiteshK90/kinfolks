import apiInstance from "../axios";
import { Visitor } from "./types";

class VisitorsService {
  getVisitors() {
    return apiInstance.get("/visitors").then((res) => res.data as Visitor[]);
  }
}

export default new VisitorsService();
