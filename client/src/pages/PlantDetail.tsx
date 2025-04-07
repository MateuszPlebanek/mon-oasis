// src/pages/PlantDetail.tsx
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { CartContext } from '../contexts/CartContext'


type Plant = {
  id: number
  name: string
  image: string
  price: number
  description: string
  category: string
}

function PlantDetail() {
  const { id } = useParams()
  const [plant, setPlant] = useState<Plant | null>(null)
  const [addedMessage, setAddedMessage] = useState(false)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    fetch(`http://localhost:5002/api/plants/${id}`)
      .then((res) => res.json())
      .then((data) => setPlant(data))
  }, [id])

  if (!plant) return <p>Chargement...</p>

  return (
    <div className='plant-detail container py-5 text-center'>
      <img
        src={`http://localhost:5002/images/${plant.image}`}
        alt={plant.name}
        className='img-fluid rounded mb-3'
        style={{ maxWidth: '400px' }}
      />
      <h2 className='text-success'>{plant.name}</h2>
      <p><strong>Prix :</strong> {Number(plant.price).toFixed(2)} €</p>
      <p><strong>Description :</strong> {plant.description}</p>
      <p><strong>Catégorie :</strong> {plant.category}</p>

      <button
        type='button'
        className='btn btn-success mt-3'
        onClick={() => {
          addToCart({
            id: plant.id,
            name: plant.name,
            image: plant.image,
            price: plant.price,
            quantity: 1,
          })
          setAddedMessage(true)
          setTimeout(() => setAddedMessage(false), 2000)
        }}
      >
        🛒 Ajouter au panier
      </button>

      {addedMessage && (
        <p className='text-success mt-2'>🌿 Ajouté au panier !</p>
      )}
    </div>
  )
}

export default PlantDetail
