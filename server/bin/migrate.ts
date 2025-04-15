// server/bin/migrate.ts
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

// Chemin vers le fichier SQL
const schemaPath = path.join(__dirname, "../database/schema.sql");

// Récupération des infos de la base depuis .env
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const migrate = async () => {
  try {
    const sql = fs.readFileSync(schemaPath, "utf8");

    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
    await connection.query(`CREATE DATABASE ${DB_NAME}`);
    await connection.query(`USE ${DB_NAME}`);
    await connection.query(sql);

    await connection.end();

    console.info(`✅ Base de données '${DB_NAME}' migrée depuis '${schemaPath}'`);
  } catch (err) {
    console.error("❌ Erreur migration :", err);
  }
};

migrate();
