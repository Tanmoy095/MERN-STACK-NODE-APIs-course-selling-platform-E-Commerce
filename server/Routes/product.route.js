import express from "express";
const router = express.Router();

//middleware
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
//controllers
import { createProduct } from "../controller/product.controller.js";

router.post("/product", requireSignIn, isAdmin, createProduct);

export default router;
