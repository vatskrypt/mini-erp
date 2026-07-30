import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { Role } from "@prisma/client";

export interface JwtPayload {
  userId: string;
  name: string,
  email: string;
  role: Role,
}

export function generateToken(payload: JwtPayload): string{
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn:"7d",
  })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
