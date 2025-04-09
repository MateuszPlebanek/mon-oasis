import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mon_oasis_secret";

export function generateToken(payload: { id: number; email: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return null;
  }
}