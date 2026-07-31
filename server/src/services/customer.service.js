import prisma from "../config/prisma.js";
class CustomerService {
    async getAll() {
        return prisma.customer.findMany({
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async getById(id) {
        return prisma.customer.findUnique({
            where: { id },
            include: {
                createdBy: true,
                followUps: true,
                challans: true,
            },
        });
    }
    async create(data) {
        return prisma.customer.create({
            data: {
                ...data,
                gstNumber: data.gstNumber ?? null,
                address: data.address ?? null,
                followUpDate: data.followUpDate ?? null,
                notes: data.notes ?? null,
            },
        });
    }
    async update(id, data) {
        return prisma.customer.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma.customer.delete({
            where: { id },
        });
    }
}
export default new CustomerService();
//# sourceMappingURL=customer.service.js.map