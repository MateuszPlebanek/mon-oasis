import db from "../../services/db";

// Type pour l'utilisateur
export type User = {
  id: number;
  email: string;
  password: string;
  civility?: string;
  firstname?: string;
  lastname?: string;
  address?: string;
  address2?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  phone?: string;
  countryCode?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
};

// 🔍 Trouver un utilisateur par email
const findByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  const users = rows as User[];
  return users[0] || null;
};

const findById = async (id: number): Promise<User | null> => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  const users = rows as User[];
  return users[0] || null;
};

// ➕ Créer un utilisateur
const create = async (
  email: string,
  hashedPassword: string,
): Promise<number> => {
  const [result] = await db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
  );
  return (result as { insertId: number }).insertId;
};

// 🔄 Mettre à jour un profil
const updateProfile = async (
  id: number,
  civility: string,
  firstname: string,
  lastname: string,
  address: string,
  address2: string,
  zipcode: string,
  city: string,
  country: string,
  phone: string,
  countryCode: string,
  birthDay: string,
  birthMonth: string,
  birthYear: string,
): Promise<void> => {
  await db.query(
    `UPDATE users
     SET civility = ?, firstname = ?, lastname = ?, address = ?, address2 = ?,
         zipcode = ?, city = ?, country = ?, phone = ?, countryCode = ?,
         birthDay = ?, birthMonth = ?, birthYear = ?
     WHERE id = ?`,
    [
      civility,
      firstname,
      lastname,
      address,
      address2,
      zipcode,
      city,
      country,
      phone,
      countryCode,
      birthDay,
      birthMonth,
      birthYear,
      id,
    ],
  );
};

const updatePassword = async (
  id: number,
  hashedPassword: string,
): Promise<void> => {
  await db.query("UPDATE users SET password = ? WHERE id = ?", [
    hashedPassword,
    id,
  ]);
};

// 🔎 Obtenir toutes les infos du profil via l'ID
const getFullProfile = async (id: number): Promise<User | null> => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  const users = rows as User[];
  return users[0] || null;
};

export default {
  findByEmail,
  findById,
  create,
  updateProfile,
  updatePassword, 
  getFullProfile,
};
