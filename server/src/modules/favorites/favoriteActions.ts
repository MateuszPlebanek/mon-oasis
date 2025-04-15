// src/modules/favorites/favoriteActions.ts
import type { Request, Response } from 'express'
import favoriteRepository from './favoriteRepository'

const getFavorites = async (req: Request, res: Response) : Promise<void> => {
  try {
    const userId = req.user?.id 
    if (!userId) {
      res.status(401).json({ message: "Non autorisé" });
      return;
    }

    const favorites = await favoriteRepository.findByUserId(Number(userId))
    res.json(favorites)
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris :", error)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

export default { getFavorites }
