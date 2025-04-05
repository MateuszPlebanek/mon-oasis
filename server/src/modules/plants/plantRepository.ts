import db from '../../../database/client'
import type { RowDataPacket } from 'mysql2'

type Plant = {
  id: number
  name: string
  image: string
  price: number
  description: string
  category: string
}

const browse = async (): Promise<Plant[]> => {
  const [rows] = await db.query<Plant[] & RowDataPacket[]>('SELECT * FROM plants')
  return rows
}

const read = async (id: number): Promise<Plant | null> => {
  const [rows] = await db.query<Plant[] & RowDataPacket[]>('SELECT * FROM plants WHERE id = ?', [id])
  return rows[0] ?? null
}

export default { browse, read }
