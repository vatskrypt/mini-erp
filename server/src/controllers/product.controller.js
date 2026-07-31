import productService from "../services/product.service.js";
class ProductController {
    async create(req, res, next) {
        try {
            const userId = req.user.userId;
            const product = await productService.create(req.body, userId);
            res.status(201).json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        try {
            const products = await productService.getAll();
            res.json({
                success: true,
                data: products,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const product = await productService.getById(id);
            res.json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const product = await productService.update(id, req.body);
            res.json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateProductStock(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.user.userId;
            if (!id || Array.isArray(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product id",
                });
            }
            const product = await productService.updateStock(id, req.body, userId);
            res.json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await productService.delete(id);
            res.json({
                success: true,
                message: "Product Deleted Successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new ProductController();
//# sourceMappingURL=product.controller.js.map