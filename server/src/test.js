import "dotenv/config";
import prisma from "./config/prisma.js";
async function main() {
    console.log(await prisma.customer.count());
    await prisma.$transaction(async (tx) => {
        console.log("inside");
        await tx.customer.count();
    });
    console.log("done");
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=test.js.map