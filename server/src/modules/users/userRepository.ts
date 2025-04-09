// src/modules/users/userRepository.ts

import db from "../../services/db";

// Type pour l'utilisateur
export type User = {
  id: number;
  email: string;
  password: string;
};

// 🔍 Trouver un utilisateur par email
const findByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  const users = rows as User[];
  return users[0] || null;
};

// ➕ Créer un utilisateur
const create = async (email: string, hashedPassword: string): Promise<number> => {
  const [result] = await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    hashedPassword,
  ]);

  // Définir un type pour le résultat de la requête
  type QueryResult = { insertId: number };

  return (result as QueryResult).insertId;
};

export default {
  findByEmail,
  create,
};
