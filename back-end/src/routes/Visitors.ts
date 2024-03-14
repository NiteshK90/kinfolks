import express from "express";
import {
  addNewVisitor,
  deleteVisitor,
  getSingleVisitor,
  getVisitors,
  updateValidity,
} from "../controllers/Visitors";

const router = express.Router();

router.post("/", addNewVisitor);

router.get("/", getVisitors);

router.get("/:id", getSingleVisitor);

router.patch("/:id", updateValidity);

router.delete("/:id", deleteVisitor);

export default router;
