import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

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

export const CartContext = createContext<CartContextType>({
  cart: [],
  totalItems: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

type Props = {
  children: ReactNode
}

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Enregistrer dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === newItem.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...prevCart, newItem]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, totalItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
