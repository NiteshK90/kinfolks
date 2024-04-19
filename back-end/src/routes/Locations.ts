import express from "express";
import {
  addNewLocationWithPlaces,
  getAllLocations,
} from "../controllers/Locations";

const router = express.Router();

router.post("/", addNewLocationWithPlaces);

router.get("/", getAllLocations);

export default router;
