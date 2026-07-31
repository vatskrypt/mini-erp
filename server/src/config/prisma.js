import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { DATABASE_URL } from "./env.js";
neonConfig.webSocketConstructor = ws;
const adapter = new PrismaNeon({
    connectionString: DATABASE_URL,
});
const globalForPrisma = globalThis;
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: ["query", "warn", "error"],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
export default prisma;
//# sourceMappingURL=prisma.js.map