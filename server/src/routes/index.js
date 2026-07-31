import { Router } from "express";
import authRoutes from "./auth.routes.js";
import customerRoutes from "./customer.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import productRoutes from "./product.routes.js";
import challanRoutes from "./challan.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
const router = Router();
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});
router.use("/auth", authRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);
router.use("/challans", challanRoutes);
router.use("/dashboard", dashboardRoutes);
export default router;
//# sourceMappingURL=index.js.map