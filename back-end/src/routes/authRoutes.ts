import { Router } from "express";
import passport from "../config/passportConfig";
import { login, dashboard } from "../controllers/authController";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

router.get("/dashboard", dashboard);

export default router;
