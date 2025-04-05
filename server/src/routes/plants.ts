import express from "express";
import pool from "../../database/client";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error("Erreur de la récupération des plantes", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
