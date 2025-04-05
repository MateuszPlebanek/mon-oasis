// src/components/PlantDetail.tsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    fetch(`http://localhost:5002/api/plants/${id}`)
      .then((res) => res.json())
      .then((data) => setPlant(data))
  }, [id])

  if (!plant) return <p>Chargement...</p>

  return (
    <div className='plant-detail'>
      <img src={`http://localhost:5002/images/${plant.image}`} alt={plant.name} />
      <h2>{plant.name}</h2>
      <p><strong>Prix :</strong> {plant.price} €</p>
      <p><strong>Description :</strong> {plant.description}</p>
      <p><strong>Catégorie :</strong> {plant.category}</p>
      <button type="button">🛒 Ajouter au panier</button>
    </div>
  )
}

export default PlantDetail
