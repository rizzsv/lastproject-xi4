import { Product } from "@prisma/client";

export interface IProductRepository {
 create(product: Product): Promise<Product>;
 findAll(): Promise<Product[]>;
 findById(id: string): Promise<Product | null>;
 update(id: string, data: Partial<Product>): Promise<Product>;
 delete(id: string): Promise<void>;
}