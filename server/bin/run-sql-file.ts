import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlFileArg = process.argv[2];

if (!sqlFileArg) {
  console.error("Missing SQL file path.");
  process.exit(1);
}

const jawsdbUrl = process.env.JAWSDB_URL;

if (!jawsdbUrl) {
  console.error("JAWSDB_URL is missing.");
  process.exit(1);
}

const url = new URL(jawsdbUrl);

const pool = mysql.createPool({
  host: url.hostname,
  port: Number(url.port || 3306),
  user: url.username,
  password: url.password,
  database: url.pathname.replace("/", ""),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const run = async () => {
  const absolutePath = path.resolve(__dirname, "..", sqlFileArg);
  const rawSql = await fs.readFile(absolutePath, "utf-8");

  const cleanedSql = rawSql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  const statements = cleanedSql
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  const connection = await pool.getConnection();

  try {
    for (const statement of statements) {
      await connection.query(statement);
    }
    console.log(`SQL file executed successfully: ${sqlFileArg}`);
  } finally {
    connection.release();
    await pool.end();
  }
};

run().catch((error) => {
  console.error("SQL execution failed:", error);
  process.exit(1);
});