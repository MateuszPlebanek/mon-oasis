import { createContext } from 'react'

export type CartItem = {
  id: number
  name: string
  image: string
  price: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  totalItems: number
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  totalItems: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

export default CartContext
