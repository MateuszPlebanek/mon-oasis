// src/modules/favorites/favoriteRepository.ts
import database from '../../services/db'

const findByUserId = async (userId: number) => {
  const [rows] = await database.query(
    `SELECT plants.* FROM favorites 
     JOIN plants ON favorites.plant_id = plants.id 
     WHERE favorites.user_id = ?`,
    [userId]
  )
  return rows
}

export default { findByUserId }
