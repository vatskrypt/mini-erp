import type { Request, Response, NextFunction } from "express";

import authService from "../services/auth.service.js";

class AuthController {
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
              res.status(400).json({
                success: false,
                message: "Email and password are required",
              });
              return;
      }
      const result = await authService.login({
        email, password,
      });
      res.status(200).json({
        success: true,
                message: "Login successful",
                data: result,
      })
    } catch(error) {
      next(error);
    }
  }
}
export default new AuthController();
