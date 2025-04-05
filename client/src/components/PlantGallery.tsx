import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
  const [visibleCount, setVisibleCount] = useState(12) 
  const [columns, setColumns] = useState(3)

useEffect(() => {
  const updateColumns = () => {
    const width = window.innerWidth
    if (width < 768) setColumns(3)
      else if (width < 1024) setColumns(3)
      else setColumns(4)
  }
  updateColumns()
  window.addEventListener('resize', updateColumns)
  return () => window.removeEventListener('resize', updateColumns)
}, [])

useEffect(() => {
  const initialCount = columns * 3
  setVisibleCount(initialCount)
}, [columns])

  useEffect(() => {
    fetch('http://localhost:5002/api/plants')
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error('Erreur fetch:', error))
  }, [])

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + columns * 3)
  }

  return (
    <>
      <section className='plant-gallery'>
        {plants.slice(0, visibleCount).map((plant) => (
          <div key={plant.id} className='plant-card'>
            <Link to={`/plant/${plant.id}`}>
              <div className='plant-image-wrapper'>
                <img
                  src={`http://localhost:5002/images/${plant.image}`}
                  alt={plant.name}
                />
                <div className='overlay'>Voir l'article</div>
              </div>
            </Link>
            <div className='plant-info'>
              <h3>{plant.name}</h3>
              <div className='stars'>★★★★★</div>
              <p>{Number(plant.price).toFixed(2)} €</p>
            </div>
          </div>
        ))}
      </section>

      {visibleCount < plants.length && (
        <div className='show-more-container'>
          <button type="button" className='show-more-btn' onClick={handleShowMore}>
            Voir plus
          </button>
        </div>
      )}
    </>
  )
}

export default PlantGallery
