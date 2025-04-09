import type { Request, Response } from "express";
import argon2 from "argon2";
import usersRepository from "./userRepository";
import { generateToken } from "./authTools/authTools";

// Inscription
const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    res.status(400).json({ message: "Email ou mot de passe invalide" });
    return;
  }

  const userExist = await usersRepository.findByEmail(email);
  if (userExist) {
    res.status(409).json({ message: "Utilisateur déjà inscrit" });
    return;
  }

  const hashed = await argon2.hash(password);
  const id = await usersRepository.create(email, hashed);

  res.status(201).json({ id, message: "Inscription réussie" });
  return;
};

// Connexion
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await usersRepository.findByEmail(email);
  if (!user) {
    res.status(404).json({ message: "Utilisateur non trouvé" });
    return;
  }

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) {
    res.status(401).json({ message: "Mot de passe incorrect" });
    return;
  }

  const token = generateToken({ id: user.id, email: user.email });

  res.cookie("authToken", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 2, // 2h
  });

  res.status(200).json({ message: "Connexion réussie" });
  return;
};

// Déconnexion
const logout = (req: Request, res: Response) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Déconnexion réussie" });
  return;
};

// Page "Mon compte"
const getAccount = async (req: Request, res: Response) => {
  interface CustomRequest extends Request {
    user: { id: string; email: string };
  }

  const user = (req as CustomRequest).user;
  res.json({ message: "Bienvenue sur votre compte", user });
  return;
};

export default {
  signup,
  login,
  logout,
  getAccount,
};
