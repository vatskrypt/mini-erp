import prisma from "../config/prisma.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

interface LoginInput{
  email: string;
  password: string;
}

class AuthService {
  async login({
    email, password
  }: LoginInput) {
    //find user
    const user = await prisma.user.findUnique({
      where: { email, },
    });
    if (!user) {
      throw new Error("invalid email or password");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("invalid email or password");
    }
    // generate jwt
    const token = generateToken({
      userId: user.id,
      name:user.name,
      email: user.email,
      role: user.role,
    });

    //remove password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
export default new AuthService();
