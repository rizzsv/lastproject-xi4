export interface Transaction {
  id?: string;
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status?: 'PENDING' | 'PAID' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';
  createdAt?: Date;
  updatedAt?: Date;
}
