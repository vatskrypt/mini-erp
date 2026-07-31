import prisma from "../config/prisma.js";
// create()
// getAll()
// getById()
// update()
// delete()
// function to clean data from partial update
function removeUndefined(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));
}
class ProductService {
    async create(data, createdById) {
        return prisma?.product.create({
            data: {
                ...data,
                warehouse: data.warehouse ?? null,
                createdBy: {
                    connect: {
                        id: createdById,
                    },
                },
            },
        });
    }
    async getAll() {
        return prisma?.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async getById(id) {
        return prisma?.product.findUnique({
            where: {
                id,
            },
        });
    }
    async update(id, data) {
        const cleanedData = removeUndefined({
            ...data,
            warehouse: data.warehouse ?? null,
        });
        return prisma?.product.update({
            where: {
                id,
            },
            data: cleanedData,
        });
    }
    async updateStock(productId, data, userId) {
        const product = await prisma.product.findUniqueOrThrow({
            where: {
                id: productId,
            },
        });
        let newStock = product.currentStock;
        if (data.movementType === "IN") {
            newStock += data.quantity;
        }
        else {
            newStock -= data.quantity;
        }
        if (newStock < 0) {
            throw new Error("Insufficient Stock");
        }
        return prisma.$transaction(async (tx) => {
            const updatedProduct = await tx.product.update({
                where: {
                    id: productId,
                },
                data: {
                    currentStock: newStock,
                },
            });
            await tx.stockLog.create({
                data: {
                    productId,
                    quantity: data.quantity,
                    movementType: data.movementType,
                    stockAfter: newStock,
                    remarks: data.remarks ?? null,
                    createdById: userId,
                },
            });
            return updatedProduct;
        });
    }
    async delete(id) {
        return prisma?.product.delete({
            where: {
                id,
            },
        });
    }
    ;
}
export default new ProductService();
//# sourceMappingURL=product.service.js.map