import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../modules/users/authTools/authTools";
import type { CustomRequest } from "../types/types";

// Extension globale pour que TypeScript reconnaisse req.user partout
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.authToken;

  if (!token) {
    res.status(401).json({ message: "Non authentifié" });
    return;
  }

  try {
    const decoded = verifyToken(token);

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("id" in decoded) ||
      !("email" in decoded)
    ) {
      res.status(403).json({ message: "Token invalide ou expiré" });
      return;
    }

    req.user = decoded as { id: string; email: string };
    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error);
    res.status(403).json({ message: "Token invalide ou expiré" });
  }
};
