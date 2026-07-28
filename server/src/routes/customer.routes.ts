import { Router } from "express";
import { Role } from "@prisma/client";

import customerController from "../controllers/customer.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Everyone who is logged in can view customers

router.get("/", authMiddleware, customerController.getAll);
router.get("/:id", authMiddleware, customerController.getById);

router.post("/", authMiddleware, roleMiddleware(Role.ADMIN, Role.SALES), customerController.create);

router.put("/:id", authMiddleware, roleMiddleware(Role.ADMIN, Role.SALES), customerController.update);

router.delete("/:id", authMiddleware, roleMiddleware(Role.ADMIN), customerController.delete);

export default router;
