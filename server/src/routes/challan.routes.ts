import { Router } from "express";
import { Role } from "@prisma/client";

import challanController from "../controllers/challan.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { roleMiddleware } from "../middleware/auth.middleware.js";

import { createChallanSchema } from "../validations/challan.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  validate(createChallanSchema),
  challanController.create
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  challanController.getAll
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  challanController.getById
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  challanController.update
);
router.delete("/:id", authMiddleware, roleMiddleware(Role.ADMIN),
  challanController.delete);
router.patch("/:id", authMiddleware, roleMiddleware(Role.ADMIN),
  challanController.confirm);

export default router;
