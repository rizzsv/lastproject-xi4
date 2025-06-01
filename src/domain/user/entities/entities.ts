export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string | null,
    public password: string,
    public phone: string | null,
    public role: "USER" | "ADMIN"
  ) {}
}


export class Transaction {
  constructor(
    public id: string,
    public productId: string,
    public userId: string,
    public quantity: number,
    public totalPrice: number,
    public status: "PENDING" | "PAID" | "SHIPED" | "COMPLETED" | "CANCELLED"
  ){}
}