import stockService from "../services/stock.service.js";
import type { Request,Response, NextFunction } from "express";
class StockController {

  async adjust(req: Request, res:Response, next:NextFunction) {
    try {

      const log =
        await stockService.adjustStock(
          req.body,
          req.user!.userId
        );

      res.status(201).json({
        success: true,
        data: log,
      });

    } catch (err) {
      next(err);
    }
  }

  async getLogs(req: Request, res:Response, next:NextFunction) {
    try {

      const logs =
        await stockService.getLogs(
          req.query.productId as string | undefined
        );

      res.json({
        success: true,
        data: logs,
      });

    } catch (err) {
      next(err);
    }
  }

}

export default new StockController();
