import { Transaction } from "../entities/Transaction";


export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  update(id: string, data: Partial<Transaction>): Promise<Transaction | null>;
  delete(id: string): Promise<void>;
}
