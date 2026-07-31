import customerService from "../services/customer.service.js";
class CustomerController {
    async getAll(req, res, next) {
        try {
            const customers = await customerService.getAll();
            res.status(200).json({
                success: true,
                data: customers,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const customer = await customerService.getById(req.params.id);
            if (!customer) {
                res.status(404).json({
                    success: false,
                    message: "Customer not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
                return;
            }
            const customer = await customerService.create({
                ...req.body,
                createdBy: {
                    connect: {
                        id: req.user.userId,
                    },
                },
            });
            res.status(201).json({
                success: true,
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const customer = await customerService.update(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await customerService.delete(req.params.id);
            res.status(200).json({
                success: true,
                message: "Customer deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new CustomerController();
//# sourceMappingURL=customer.controller.js.map