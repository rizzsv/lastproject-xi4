import express from "express";
import { ProductController } from "../controllers/productController";
import { verifyToken } from "../../helper/jwt.helper";
import { productValidation } from "../../middleware/product.middleware";

const router = express.Router();

router.post("/Create", [verifyToken], productValidation, ProductController.create);
router.get("/GetAll", ProductController.findAll);
router.get("/GetById/:id", ProductController.findById);
router.put("/Update/:id", [verifyToken], productValidation, ProductController.update);
router.delete("/Delete/:id", [verifyToken], ProductController.delete);

export default router;