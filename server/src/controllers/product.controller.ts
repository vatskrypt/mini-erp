import type { NextFunction, Request, Response } from "express";
import productService from "../services/product.service.js";


class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const product = await productService.create(req.body, userId);

      res.status(201).json({
        success: true,
        data: product,
      });
    }
    catch (error) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAll();
      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const product = await productService.getById(id);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const product = await productService.update(id, req.body);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProductStock(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userId = req.user!.userId;

      const product = await productService.updateStock(
        id,
        req.body,
        userId
      );

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await productService.delete(id);

      res.json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) { next(error); }
  }
}

export default new ProductController();
