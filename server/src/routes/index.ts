import { Router } from "express";

import authRoutes from "./auth.routes.js"
import customerRoutes from "./customer.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import productRoutes from "./product.routes.js";

const router = Router();

router.get("/me", authMiddleware, (req,res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
router.use("/auth", authRoutes);
router.use("/")
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);

export default router;
// TODO: Register routes here
// app.use("/challans", challanRoutes);
