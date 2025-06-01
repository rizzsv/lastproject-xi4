import { PrismaClient, Product } from "@prisma/client";
import { IProductRepository } from "../../domain/product/repositories/IProductRepository";


const prisma = new PrismaClient();

export class ProductRepository implements IProductRepository {
async create(product: Product): Promise<Product> {
const now = new Date();
const created = await prisma.product.create({
  data: {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image,
    createdAt: now,
    updatedAt: now,
  }
});
    return created;
  }

  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return await prisma.product.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}