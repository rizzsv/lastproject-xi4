import express from "express";
import { TransactionController } from '../controllers/transactionController';


const router = express.Router();

router.get('/GetAll', TransactionController.findAll);
router.get('/:id', TransactionController.findById);
router.post('/', TransactionController.create);
router.put('/:id', TransactionController.updateStatus);
router.delete('/:id', TransactionController.delete);

export default router;
