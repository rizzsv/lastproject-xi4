import { Transaction } from "../entities/Transaction";
import { ITransactionRepository } from "../repositories/ITransactionRepository";


export class TransactionUsecase {
  constructor(private transactionRepo: ITransactionRepository) {}

  create(data: Transaction) {
    return this.transactionRepo.create(data);
  }

  getAll() {
    return this.transactionRepo.findAll();
  }

  getById(id: string) {
    return this.transactionRepo.findById(id);
  }

  update(id: string, data: Partial<Transaction>) {
    return this.transactionRepo.update(id, data);
  }

  delete(id: string) {
    return this.transactionRepo.delete(id);
  }
}
