import { useContext } from 'react'
import CartContext  from '../contexts/CartContext'
import '../styles/Cart.css' 

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext)

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="cart-container">
      <h2>🛒 Mon Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={`http://localhost:5002/images/${item.image}`} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.quantity} x {Number(item.price).toFixed(2)} €</p>
                </div>
                <button type="button" onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-sm">
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <p><strong>Total :</strong> {total.toFixed(2)} €</p>
          <button type="button" onClick={clearCart} className="btn btn-warning">Vider le panier</button>
        </>
      )}
    </div>
  )
}

export default Cart
