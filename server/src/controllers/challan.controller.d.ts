import type { Request, Response, NextFunction } from "express";
declare class ChallanController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    confirm(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: ChallanController;
export default _default;
//# sourceMappingURL=challan.controller.d.ts.map