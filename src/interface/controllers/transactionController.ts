import { Request, Response } from "express";
import {
  CreateTransaction,
  DeleteTransaction,
  GetAllTransactions,
  GetTransactionById,
  UpdateTransactionStatus,
} from "../../domain/transaction/usecase/transaction.usecase";
import { TransactionStatus } from "@prisma/client";
import { TransactionRepository } from "../../infrastructure/prisma/transactionRepository";

const transactionRepository = new TransactionRepository();

export class TransactionController {
  static async create(req: Request, res: Response) {
    try {
      const { userId, productId, quantity, totalPrice } = req.body;

      if (!userId || !productId || !quantity || !totalPrice) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const createTransaction = new CreateTransaction(transactionRepository);
      const transaction = await createTransaction.execute({
        userId,
        productId,
        quantity,
        totalPrice,
      });

      return res.status(201).json({
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const getAll = new GetAllTransactions(transactionRepository);
      const transactions = await getAll.execute();

      return res.status(200).json({
        message: "Transactions fetched successfully",
        data: transactions,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const getOne = new GetTransactionById(transactionRepository);
      const transaction = await getOne.execute(id);

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      return res.status(200).json({
        message: "Transaction found",
        data: transaction,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validasi status harus sesuai enum dari Prisma
      const validStatuses = Object.values(TransactionStatus);
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          error: `Invalid or missing status. Valid statuses: ${validStatuses.join(", ")}`,
        });
      }

      const updateStatus = new UpdateTransactionStatus(transactionRepository);
      const transaction = await updateStatus.execute(id, status as TransactionStatus);

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      return res.status(200).json({
        message: "Transaction status updated",
        data: transaction,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleteTransaction = new DeleteTransaction(transactionRepository);
    await deleteTransaction.execute(id);

    return res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

}
