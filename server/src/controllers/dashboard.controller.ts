import type { Request, Response } from "express";
import dashboardService from "../services/dashboard.service.js";

class DashboardController {
  async getDashboard(req: Request, res: Response) {
    try {
      const dashboard = await dashboardService.getDashboard();
      return res.json({
        success: true,
        message: "Dashboard loaded successfully",
        data: dashboard,
      });
    } catch (error) {
      console.error("Dashboard error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to load dashboard",
      });
    }
  }
}

export default new DashboardController();
