import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";

class CustomerService {
  async getAll() {
    return prisma.customer.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email:true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      include: {
        createdBy: true,
        followUps: true,
        challans: true,
      },
    });
  }

  async create(data: Prisma.CustomerCreateInput) {
    return prisma.customer.create({ data, });
  }

  async update(
    id: string,
    data: Prisma.CustomerUpdateInput
  ) {
    return prisma.customer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.customer.delete({
      where: { id },
    });
  }
}

export default new CustomerService();
