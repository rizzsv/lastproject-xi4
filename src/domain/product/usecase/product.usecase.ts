import { IProductRepository } from "../repositories/IProductRepository";
import { Product } from "../entities/entities";
import { v4 as uuidv4 } from "uuid";

// --- Create Product ---
export class CreateProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  }) {
    const now = new Date();

const product = new Product(
  uuidv4(),
  data.name,
  data.description,
  data.price,
  data.stock,
  data.image,
  now,
  now
);

    const created = await this.productRepository.create(product);
    return created;
  }
}

// --- Get All Products ---
export class GetAllProducts {
  constructor(private productRepository: IProductRepository) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}

// --- Get Product by ID ---
export class GetProductById {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}

// --- Update Product ---
export class UpdateProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, data: Partial<Omit<Product, "id">>) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new Error("Product not found");
    }

    const updated = await this.productRepository.update(id, data);
    return updated;
  }
}

// --- Delete Product ---
export class DeleteProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new Error("Product not found");
    }

    await this.productRepository.delete(id);
  }
}
