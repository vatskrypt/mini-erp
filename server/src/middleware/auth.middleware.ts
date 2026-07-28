import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";
import { Role } from "@prisma/client";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
):
  void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
      return;
    }
    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Invalid authorizaton format",
      })
      return;
    }
    // const [, token] = authHeader.split(" ");
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      res.status(401).json({
        success: false,
        message:"Invalid authorization format",
      })
      return;
    }
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    })
  }
}

export function roleMiddleware(...allowedRoles: Role[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message:"Forbidden",
      })
      return;
    }
    next();
  }
}
