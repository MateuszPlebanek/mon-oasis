import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../modules/users/authTools/authTools";

// Extension de l'objet Request pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.authToken;

  if (!token) {
    res.status(401).json({ message: "Non authentifié" });
    return; // 👈 important
  }

  const decoded = verifyToken(token);

  if (
    !decoded ||
    typeof decoded !== "object" ||
    !("id" in decoded) ||
    !("email" in decoded)
  ) {
    res.status(403).json({ message: "Token invalide ou expiré" });
    return; // 👈 important
  }

  req.user = decoded as { id: string; email: string };
  next(); // 👈 continue normalement
}
