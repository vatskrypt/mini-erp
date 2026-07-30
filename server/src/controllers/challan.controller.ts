import type { Request, Response, NextFunction } from "express";

import challanService from "../services/challan.service.js";
import { challanIdSchema, challanQuerySchema, updateChallanSchema } from "../validations/challan.validation.js";

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
  async getAll(req: Request, res: Response) {
    const query = challanQuerySchema.parse(req.query);
    const result = await challanService.getAll(query);
    res.json(result);
  }
  async getById(req: Request, res: Response) {
    const { id } = challanIdSchema.parse(req.params);

    const challan = await challanService.getById(id);
    res.json(challan);

  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  )  {
    try {
      const { id } = challanIdSchema.parse(req.params);

      const data = updateChallanSchema.parse(req.body);

      const challan = await challanService.update(id, data);

      res.json({
        success: true,
        message: "Challan updated successfully",
        data: challan,
      });
    } catch (error) {
      next(error);
    }
  };
  async confirm( req: Request,
   res: Response) {
     const { id } = challanIdSchema.parse(req.params);


       const challan = await challanService.confirm(
         id,
         req.user!.userId
       );

       res.json({
         success: true,
         message: "Challan confirmed successfully",
         data: challan,
       });

  }
  async delete( req: Request,
   res: Response) {
     const { id } = challanIdSchema.parse(req.params);

       await challanService.delete(id);

       res.json({
         success: true,
         message: "Challan deleted successfully",
       });
  };
}
export default new ChallanController();
