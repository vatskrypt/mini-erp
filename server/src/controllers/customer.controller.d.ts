import type { Request, Response, NextFunction } from "express";
type CustomerParams = {
    id: string;
};
declare class CustomerController {
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request<CustomerParams>, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request<CustomerParams>, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request<CustomerParams>, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: CustomerController;
export default _default;
//# sourceMappingURL=customer.controller.d.ts.map