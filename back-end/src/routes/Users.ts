import express from "express";
import { getUsers } from "../controllers/Users";

const router = express.Router();

router.get("/", getUsers);

export default router;
