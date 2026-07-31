import { success } from "zod/mini";
import stockService from "../services/stock.service.js";
class StockController {
    async adjust(req, res, next) {
        try {
            const log = await stockService.adjustStock(req.body, req.user.userId);
            res.status(201).json({
                success: true,
                data: log,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async getLogs(req, res, next) {
        try {
            const logs = await stockService.getLogs(req.query.productId);
            res.json({
                success: true,
                data: logs,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
export default new StockController();
//# sourceMappingURL=stock.controller.js.map