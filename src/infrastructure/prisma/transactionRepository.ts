import { PrismaClient, Transaction, TransactionStatus } from "@prisma/client";
import { ITransactionRepository } from "../../domain/transaction/repositories/ITransactionRepository";



const prisma = new PrismaClient();

export class TransactionRepository implements ITransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    const created = await prisma.transaction.create({
      data: {
        id: transaction.id,
        userId: transaction.userId,
        productId: transaction.productId,
        quantity: transaction.quantity,
        totalPrice: transaction.totalPrice,
        status: transaction.status as TransactionStatus,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      },
    });

    return this.toEntity(created);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({ where: { id } });
    return transaction ? this.toEntity(transaction) : null;
  }

  async findAll(): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany();
    return transactions.map(this.toEntity); 
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({ where: { userId } });
    return transactions.map(this.toEntity);
  }

  async updateStatus(id: string, status: string): Promise<Transaction> {
    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        status: status as TransactionStatus,
        updatedAt: new Date(),
      },
    });

    return this.toEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.transaction.delete({ where: { id } });
  }

private toEntity(data: any): Transaction {
  return {
    id: data.id,
    userId: data.userId,
    productId: data.productId,
    quantity: data.quantity,
    totalPrice: data.totalPrice,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

}
