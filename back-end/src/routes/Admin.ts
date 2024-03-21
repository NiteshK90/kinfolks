import express from "express";
import { login, updatePassword } from "../controllers/Admin";

const router = express.Router();

router.patch("/change-password", updatePassword);

router.patch("/login", login);

export default router;
