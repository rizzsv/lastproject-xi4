import { PrismaClient, Transaction } from "@prisma/client";
import { ITransactionRepository } from "../../domain/transaction/repositories/ITransactionRepository";


const prisma = new PrismaClient();

export class TransactionRepository implements ITransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    const now = new Date();
    const created = await prisma.transaction.create({
      data: {
        userId: transaction.userId,
        productId: transaction.productId,
        quantity: transaction.quantity,
        totalPrice: transaction.totalPrice,
        status: transaction.status ?? "PENDING",
        createdAt: now,
        updatedAt: now,
      },
    });
    return created;
  }

  async findAll(): Promise<Transaction[]> {
    return await prisma.transaction.findMany();
  }

  async findById(id: string): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return updated;
  }

  async delete(id: string): Promise<void> {
    await prisma.transaction.delete({ where: { id } });
  }
}
