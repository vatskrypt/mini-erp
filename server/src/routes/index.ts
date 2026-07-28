import { Router } from "express";

import authRoutes from "./auth.routes.js"
import customerRoutes from "./customer.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, (req,res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
router.use("/auth", authRoutes);

router.use("/customer", customerRoutes);

export default router;
