import { createContext } from 'react'

type FavoriteContextType = {
  favorites: number[]
  toggleFavorite: (plantId: number) => void
}

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
})

export default FavoriteContext
