import { Request, Response } from "express";
import { ProductRepository } from "../../infrastructure/prisma/productRepository";
import { CreateProduct, DeleteProduct, GetAllProducts, GetProductById, UpdateProduct } from "../../domain/product/usecase/product.usecase";


const productRepository = new ProductRepository();

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const createProduct = new CreateProduct(productRepository);
      const product = await createProduct.execute(req.body);
      res.status(201).json({ message: "Product created", product });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const getAll = new GetAllProducts(productRepository);
      const products = await getAll.execute();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const getOne = new GetProductById(productRepository);
      const product = await getOne.execute(req.params.id);
      res.status(200).json(product);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updateProduct = new UpdateProduct(productRepository);
      const updated = await updateProduct.execute(req.params.id, req.body);
      res.status(200).json({ message: "Product updated", product: updated });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleteProduct = new DeleteProduct(productRepository);
      await deleteProduct.execute(req.params.id);
      res.status(200).json({ message: "Product deleted" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
