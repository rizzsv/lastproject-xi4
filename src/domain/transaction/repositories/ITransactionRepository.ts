import { Transaction } from "@prisma/client";


export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  updateStatus(id: string, status: string): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
