import { TransactionStatus } from "@prisma/client";

export class Transaction {
  constructor(
    public id: string,
    public userId: string,
    public productId: string,
    public quantity: number,
    public totalPrice: number,
    public status: TransactionStatus,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
