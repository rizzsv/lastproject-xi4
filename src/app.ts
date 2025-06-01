// src/app.ts
import express from "express";
import userRoutes from "./interface/route/user.routes";
import productRoutes from "./interface/route/product.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

export default app;
