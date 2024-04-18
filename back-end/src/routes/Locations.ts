import express from "express";
import { addNewLocationWithPlaces } from "../controllers/Locations";

const router = express.Router();

router.post("/", addNewLocationWithPlaces);

export default router;
