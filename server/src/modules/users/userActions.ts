import type { Request, Response, NextFunction } from "express";
import argon2 from "argon2";
import usersRepository from "./userRepository";
import { generateToken } from "./authTools/authTools";
import type { CustomRequest } from "../../types/types";

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
  
};

// Connexion
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
} catch (err) {
  next(err)
}
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
const getAccount = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
     res.status(401).json({ message: "Non authentifié" });
     return;
    }
    const userId = Number(req.user.id);
    const user = await usersRepository.getFullProfile(userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json({ user }); 
  } catch (err) {
    next(err);
  }
};

// 🔄 Mise à jour du profil utilisateur
const updateProfile = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const userId = Number(req.user.id);
    const {
      civility, firstname, lastname, address, address2,
      zipcode, city, country, phone, countryCode,
      birthDay, birthMonth, birthYear
    } = req.body;

    await usersRepository.updateProfile(
      userId,
      civility, firstname, lastname, address, address2,
      zipcode, city, country, phone, countryCode,
      birthDay, birthMonth, birthYear
    );

    res.status(200).json({ message: "Profil mis à jour avec succès" });
  } catch (err) {
    next(err);
  }
};
// 🔐 Changement de mot de passe sécurisé
const changePassword = async (req: CustomRequest, res: Response, next: NextFunction) : Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const userId = Number(req.user.id);
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
       res.status(400).json({ message: "Champs manquants" });
        return;
    }

    const user = await usersRepository.findById(userId);
    if (!user) {
       res.status(404).json({ message: "Utilisateur non trouvé" });
       return;
    }

    const isMatch = await argon2.verify(user.password, oldPassword);
    if (!isMatch) {
      res.status(401).json({ message: "Ancien mot de passe incorrect" });
   return;
    }

    const hashed = await argon2.hash(newPassword);
    await usersRepository.updatePassword(userId, hashed);

   res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
   return;
  } catch (err) {
    next(err);
  }
};

export default {
  signup,
  login,
  logout,
  getAccount,
  updateProfile,
  changePassword,
};