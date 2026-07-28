import type { Request, Response, NextFunction } from "express";
import {
  CustomerStatus,
  CustomerType,
} from "@prisma/client";

import customerService from "../services/customer.service.js";

type CustomerParams = {
  id: string;
};
class CustomerController {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const customers = await customerService.getAll();

      res.status(200).json({
        success: true,
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request<CustomerParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const customer = await customerService.getById(req.params.id);

      if (!customer) {
        res.status(404).json({
          success: false,
          message: "Customer not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const {
        name,
        mobile,
        email,
        businessName,
        gstNumber,
        customerType,
        status,
        address,
        followUpDate,
        notes,
      } = req.body;

      const customer = await customerService.create({
        name,
        mobile,
        email,
        businessName,
        gstNumber,
        customerType: customerType as CustomerType,
        status: status as CustomerStatus,
        address,
        followUpDate,
        notes,
        createdBy: {
          connect: {
            id: req.user.userId,
          },
        },
      });

      res.status(201).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request<CustomerParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const customer = await customerService.update(
        req.params.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request<CustomerParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await customerService.delete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController();
