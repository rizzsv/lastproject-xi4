import { Request, Response } from "express";
import { TransactionRepository } from "../../infrastructure/prisma/transactionRepository";
import { TransactionUsecase } from "../../domain/transaction/usecase/transaction.usecase";

const transactionRepository = new TransactionRepository();
const transactionUsecase = new TransactionUsecase(transactionRepository);

export class TransactionController {
  static async create(req: Request, res: Response) {
    try {
      const transaction = await transactionUsecase.create(req.body);
      res.status(201).json({ message: "Transaction created", transaction });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const transactions = await transactionUsecase.getAll();
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const transaction = await transactionUsecase.getById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await transactionUsecase.update(req.params.id, req.body);
      res.status(200).json({ message: "Transaction updated", transaction: updated });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await transactionUsecase.delete(req.params.id);
      res.status(200).json({ message: "Transaction deleted" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
