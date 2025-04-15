// src/main.ts
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.info(`✅ Serveur lancé sur http://localhost:${PORT}`);
  }
});