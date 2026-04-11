import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const jawsdbUrl = process.env.JAWSDB_URL;

console.log("JAWSDB_URL detected:", Boolean(jawsdbUrl));
console.log(
  "DB target:",
  jawsdbUrl ? new URL(jawsdbUrl).hostname : process.env.DB_HOST || "localhost",
);

const db = jawsdbUrl
  ? (() => {
      const url = new URL(jawsdbUrl);

      return mysql.createPool({
        host: url.hostname,
        port: Number(url.port || 3306),
        user: url.username,
        password: url.password,
        database: url.pathname.replace("/", ""),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    })()
  : mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "mon_oasis",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

export default db;