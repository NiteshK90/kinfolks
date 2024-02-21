import express from "express";
import {
  addNewVisitor,
  getSingleVisitor,
  getVisitors,
} from "../controllers/Visitors";

const router = express.Router();

router.post("/", addNewVisitor);

router.get("/", getVisitors);

router.get("/:id", getSingleVisitor);

export default router;
