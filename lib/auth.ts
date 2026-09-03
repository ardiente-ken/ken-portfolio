import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin_session";
const SECRET = process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret-change-me";

export function createSessionToken() {
  return jwt.sign({ role: "admin" }, SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const payload = jwt.verify(token, SECRET) as { role?: string };
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function getIsAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
