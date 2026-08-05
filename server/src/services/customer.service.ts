import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";
import type { createCustomerInput, CustomerQueryInput } from "../validations/customer.validation.js";

class CustomerService {
  async getAll(query: CustomerQueryInput) {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.CustomerWhereInput = {};
    if (search) {
      where.OR = [{
        name: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }, {
        businessName: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      ];
    }
    const [customers, total] = await prisma.$transaction([
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.customer.count({
        where,
      }),
    ]);
    return {
      data: customers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
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

  async create(
    data: createCustomerInput & {
      createdBy: {
        connect: {
          id: string;
        };
      };
    }
  ) {
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
