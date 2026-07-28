import dotenv from "dotenv";

import { generateToken, verifyToken } from "./utils/jwt.js";
dotenv.config();
const token = generateToken({
  id: "123",
  email: "admin@test.com",
  role: "ADMIN",
});

console.log("generated token: ");
console.log(token);

const payload = verifyToken(token);

console.log("\ndecoded payload: ");
console.log(payload);
