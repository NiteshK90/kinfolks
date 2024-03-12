import express from "express";
import {
  addNewVisitor,
  getSingleVisitor,
  getVisitors,
  updateValidity,
} from "../controllers/Visitors";

const router = express.Router();

router.post("/", addNewVisitor);

router.get("/", getVisitors);

router.get("/:id", getSingleVisitor);

router.patch("/:id", updateValidity);

export default router;
