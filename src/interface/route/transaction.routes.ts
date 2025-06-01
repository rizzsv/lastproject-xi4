import { Router } from "express";
import { TransactionController } from "../controllers/transactionController";


const router = Router();

router.post("/create", TransactionController.create);
router.get("/getAll", TransactionController.findAll);
router.put("/update/:id", TransactionController.update);
router.delete("/delete/:id", TransactionController.delete);

export default router;
