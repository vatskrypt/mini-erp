
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  exp: number;
}

export function saveToken(token: string): void {
  localStorage.setItem("token", token);

  const payload = jwtDecode<JwtPayload>(token);

  localStorage.setItem("role", payload.role);
  localStorage.setItem("user", payload.name);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = decodeToken(token);

    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
}

export function getRole(): string | null {
  return localStorage.getItem("role");
}

export function getUser(): string | null {
  return localStorage.getItem("user");
}
