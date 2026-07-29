import prisma from "../config/prisma.js";

class DashboardService {
  async getDashboard() {
    const [
      customerCount,
      productCount,
      draftCount,
      confirmedCount,
      inventory,
      products,
      recentChallans,
      recentStockLogs,
    ] = await prisma.$transaction([
      prisma.customer.count(),

      prisma.product.count(),

      prisma.challan.count({
        where: {
          status: "DRAFT",
        },
      }),

      prisma.challan.count({
        where: {
          status: "CONFIRMED",
        },
      }),

      prisma.product.aggregate({
        _sum: {
          currentStock: true,
        },
      }),

      prisma.product.findMany({
        orderBy: {
          currentStock: "asc",
        },
      }),

      prisma.challan.findMany({
        take: 5,
        orderBy: {
          challanDate: "desc",
        },
        include: {
          customer: {
            select: {
              name: true,
            },
          },
        },
      }),

      prisma.stockLog.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: {
            select: {
              name: true,
              sku: true,
            },
          },
          createdBy: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

    const lowStock = products
      .filter(
        (product) => product.currentStock <= product.minimumStock
      )
      .slice(0, 10);

    const dashboard = {
          summary: {
            customers: customerCount,
            products: productCount,
            draftChallans: draftCount,
            confirmedChallans: confirmedCount,
            inventoryUnits: inventory._sum.currentStock ?? 0,
            lowStockProducts: lowStock.length,
          },

          recentChallans,

          lowStock,

          recentStockLogs,
        };
    return dashboard;
    // return {
    //   summary: {
    //     customers: customerCount,
    //     products: productCount,
    //     draftChallans: draftCount,
    //     confirmedChallans: confirmedCount,
    //     inventoryUnits: inventory._sum.currentStock ?? 0,
    //     lowStockProducts: lowStock.length,
    //   },

    //   recentChallans,
    //   lowStock,
    //   recentStockLogs,
    // };
  }
}

export default new DashboardService();
