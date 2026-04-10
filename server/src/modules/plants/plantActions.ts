// src/modules/plants/plantActions.ts
import type { Request, Response } from 'express'
import plantRepository from './plantRepository'

const browse = async (_req: Request, res: Response) => {
  try {
    const plants = await plantRepository.browse()
    res.json(plants)
  } catch (error) {
    console.error('Erreur lors de la récupération des plantes:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const read = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id

    if (!idParam) {
      res.status(400).json({ message: 'ID de plante manquant' })
      return
    }

    const id = Number.parseInt(idParam, 10)

    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'ID de plante invalide' })
      return
    }

    const plant = await plantRepository.read(id)

    if (plant) res.json(plant)
    else res.status(404).json({ message: 'Plante non trouvée' })
  } catch (error) {
    console.error('Erreur lors de la récupération de la plante:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

export default { browse, read }