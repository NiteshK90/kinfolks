import express from "express";
import { getSingleVisitor, getVisitors } from "../controllers/Visitors";

const router = express.Router();

router.get("/", getVisitors);

router.get("/:id", getSingleVisitor);

export default router;
