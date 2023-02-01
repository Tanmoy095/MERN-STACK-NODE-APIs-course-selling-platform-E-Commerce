import express from "express";
import formidable from "express-formidable";
const router = express.Router();

//middleware
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
//controllers
import {
  createProduct,
  getAllProduct,
  getRequestedProductBySlug,
  getPhotoById,
  deleteProductById,
  updateProductById,
} from "../controller/product.controller.js";

router.post("/product", requireSignIn, isAdmin, formidable(), createProduct);
router.get("/products", getAllProduct);
router.get("/product/:slug", getRequestedProductBySlug);
router.get("/product/photo/:productId", getPhotoById);
router.delete("/product/:productId", requireSignIn, isAdmin, deleteProductById);
router.put(
  "/product/:productId",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductById
);

export default router;
