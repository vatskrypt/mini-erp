import { Role } from "@prisma/client";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../validations/product.validation.js";
import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { adjustStockSchema } from "../validations/stock.validation.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(Role.ADMIN),
    validate(createProductSchema),
    productController.create
);

router.get(
    "/",
    authMiddleware,
    productController.getAll
);

router.get(
  "/:id",
  authMiddleware,
  productController.getById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(Role.ADMIN),
    validate(updateProductSchema),
    productController.update
);
router.patch("/:id/stock",
  authMiddleware,
  roleMiddleware(Role.ADMIN), validate(adjustStockSchema),productController.updateProductStock);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(Role.ADMIN),
    productController.delete
);

export default router;
