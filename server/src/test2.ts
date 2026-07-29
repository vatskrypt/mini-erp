import prisma from "./config/prisma.js";

async function main() {
  console.log("Testing findMany...");
  const customers = await prisma.customer.findMany();
  console.log(customers);

  console.log("Testing transaction...");
  const result = await prisma.$transaction(async (tx) => {
    console.log("Inside transaction");
    return tx.customer.findMany();
  });

  console.log(result);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
