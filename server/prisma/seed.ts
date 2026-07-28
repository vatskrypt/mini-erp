import "dotenv/config";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role  } from "@prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});
async function main() {
  const password = await bcrypt.hash("admin123", 5);
  const users = [
     {
       name: "Admin",
       email: "admin@erp.com",
       password: password,
       role: Role.ADMIN,
     },
     {
       name: "Sales",
       email: "sales@erp.com",
       password: password,
       role: Role.SALES,
     },
     {
       name: "Warehouse",
       email: "warehouse@erp.com",
       password: password,
       role: Role.WAREHOUSE,
     },
     {
       name: "Accounts",
       email: "accounts@erp.com",
       password: password,
       role: Role.ACCOUNTS,
     },
   ];

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email
      },
      update: {},
      create: user,
    });
  }
  console.log("Database seeded successfully");
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
})
