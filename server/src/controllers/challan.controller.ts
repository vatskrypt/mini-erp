import type { Request, Response, NextFunction } from "express";

import challanService from "../services/challan.service.js";

class ChallanController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("controller reached");
      console.log(req.body);
      console.log(req.user);
      const challan = await challanService.create(
        req.body,
        req.user!.userId
      );
      console.log("controller end");
      res.status(201).json({
        success: true,
        data: challan,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

export default new ChallanController();
