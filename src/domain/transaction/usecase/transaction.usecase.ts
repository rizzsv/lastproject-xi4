import { ITransactionRepository } from "../repositories/ITransactionRepository";
import { Transaction } from "../entities/Transaction";
import { v4 as uuidv4 } from "uuid";
import { TransactionStatus } from "@prisma/client";

export class CreateTransaction {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: {
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
  }) {
    const transaction = new Transaction(
      uuidv4(),
      data.userId,
      data.productId,
      data.quantity,
      data.totalPrice,
      TransactionStatus.PENDING,
      new Date(),
      new Date()
    );
    return await this.transactionRepository.create(transaction);
  }
}

export class GetAllTransactions {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute() {
    return await this.transactionRepository.findAll();
  }
}

export class GetTransactionById {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: string) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  }
}

export class UpdateTransactionStatus {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: string, status: TransactionStatus) {
    return await this.transactionRepository.updateStatus(id, status);
  }
}

export class DeleteTransaction {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: string) {
    await this.transactionRepository.delete(id);
  }
}
