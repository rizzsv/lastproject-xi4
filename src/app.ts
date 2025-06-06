// src/app.ts
import express from "express";
import userRoutes from "./interface/route/user.routes";
import productRoutes from "./interface/route/product.routes";
import transactionRoutes from "./interface/route/transaction.routes";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes)

export default app;
