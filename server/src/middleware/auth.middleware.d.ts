import type { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): void;
export declare function roleMiddleware(...allowedRoles: Role[]): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map