import express from "express";
const router = express.Router();
//controllers
import { logIn, register, secret } from "../controller/auth.controller.js";
//middleware
import { requireSignIn, isAdmin } from "../middlewares/auth.middleware.js";

router.post("/register", register);
router.post("/login", logIn);
router.get("/secret", requireSignIn, isAdmin, secret);

export default router;
