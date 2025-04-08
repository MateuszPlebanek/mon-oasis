import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import FavoriteContext from './FavoriteContext'

type Props = {
  children: ReactNode
}

export function FavoriteProvider({ children }: Props) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (plantId: number) => {
    setFavorites((prev) =>
      prev.includes(plantId)
        ? prev.filter((id) => id !== plantId)
        : [...prev, plantId]
    )
  }

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  )
}
