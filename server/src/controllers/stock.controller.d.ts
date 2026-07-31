import type { Request, Response, NextFunction } from "express";
declare class StockController {
    adjust(req: Request, res: Response, next: NextFunction): Promise<void>;
    getLogs(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: StockController;
export default _default;
//# sourceMappingURL=stock.controller.d.ts.map