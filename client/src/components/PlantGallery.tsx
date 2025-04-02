import { useEffect, useState } from 'react'
import '../styles/PlantGallery.css'

type Plant = {
  id: number
  name: string
  image: string
  price: number
  description: string
  category: string
}

function PlantGallery() {
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/plants')
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error('Erreur fetch:', error))
  }, [])

  return (
    <section className='plant-gallery'>
      {plants.map((plant) => (
        <div key={plant.id} className='plant-card'>
          <img src={`http://localhost:5000/uploads/${plant.image}`} alt={plant.name} />
          <h3>{plant.name}</h3>
          <p>{plant.price}€</p>
          <p className='plant-description'>{plant.description}</p>
        </div>
      ))}
    </section>
  )
}

export default PlantGallery
