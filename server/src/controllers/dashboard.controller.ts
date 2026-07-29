import type { Request, Response } from "express";
import dashboardService from "../services/dashboard.service.js";

class DashboardController {
  async getDashboard(req: Request, res: Response) {
    const dashboard = await dashboardService.getDashboard();

    res.json(dashboard);
  }
}

export default new DashboardController();
