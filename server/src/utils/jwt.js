import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { Role } from "@prisma/client";
export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
}
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
//# sourceMappingURL=jwt.js.map