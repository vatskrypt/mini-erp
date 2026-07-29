import { Router } from "express";
import { Role } from "@prisma/client";

import stockController from "../controllers/stock.controller.js";

import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/auth.middleware.js";

import { validate } from "../middleware/validate.middleware.js";

import {
  adjustStockSchema,
} from "../validations/stock.validation.js";

const router = Router();

router.post(
  "/adjust",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  validate(adjustStockSchema),
  stockController.adjust
);

router.get(
  "/",
  authMiddleware,
  stockController.getLogs
);

export default router;
