import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import "../styles/Cart.css";

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Nécessaire pour envoyer le cookie JWT
        body: JSON.stringify({
          cartItems: cart.map((item) => ({
            plantId: item.id,
            quantity: item.quantity,
          })),
          total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
      });
  
      if (!res.ok) {
        throw new Error("Échec de la commande");
      }

      alert("Commande validée !");
      clearCart();
    } catch (error) {
      console.error("Erreur commande :", error);
      alert("Erreur lors de la commande");
    }
  };

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
                <img
                  src={`http://localhost:5002/images/${item.image}`}
                  alt={item.name}
                />
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    {item.quantity} × {Number(item.price).toFixed(2)} €
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <p>
            <strong>Total :</strong> {total.toFixed(2)} €
          </p>
          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={clearCart}
              className="btn btn-warning"
            >
              Vider le panier
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="btn btn-success"
            >
              Valider la commande
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
