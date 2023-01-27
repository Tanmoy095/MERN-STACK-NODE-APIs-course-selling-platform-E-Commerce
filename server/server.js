import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
//routes....
import authRoutes from "./Routes/auth.router.js";
import categoryRoutes from "./Routes/category.router.js";
import productRoutes from "./Routes/product.route.js";
const app = express();

dotenv.config();
//db
const MONGO_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)

  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log("DB ERROR=>", err));

//middleware

app.use(morgan("dev"));
app.use(express.json());
//router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
