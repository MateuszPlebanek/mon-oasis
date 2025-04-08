import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { BiFilter, BiSortAlt2 } from "react-icons/bi";
import FavoriteContext from "../contexts/FavoriteContext";
import SortFilterModal from "./SortFilterModal";
import FilterModal from "./FilterModal"; // 👈 nouveau fichier à créer
import SearchContext from "../contexts/SearchContext";
import "../styles/PlantGallery.css";

type Plant = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

function PlantGallery() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [columns, setColumns] = useState(3);
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { searchTerm } = useContext(SearchContext);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortOption, setSortOption] = useState<string>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) setColumns(3);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    const initialCount = columns * 3;
    setVisibleCount(initialCount);
  }, [columns]);

  useEffect(() => {
    fetch("http://localhost:5002/api/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Erreur fetch:", error));
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + columns * 3);
  };

  const filteredPlants = selectedCategory
    ? plants.filter((plant) => plant.category === selectedCategory)
    : plants;

  const searchedPlants = filteredPlants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedPlants = [...searchedPlants].sort((a, b) => {
    if (sortOption === "asc") return a.price - b.price;
    if (sortOption === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <div className="gallery-actions">
        <button
          type="button"
          className="filter-icon-label"
          onClick={() => setShowFilterModal(true)}
        >
          <BiFilter size={20} />
          <span className="filter-text">Filtrer</span>
        </button>

        <button
          type="button"
          className="sort-icon-label"
          onClick={() => setShowSortModal(true)}
        >
          <span className="sort-text">Trier par</span>
          <BiSortAlt2 size={22} />
        </button>
      </div>

      {showSortModal && (
        <SortFilterModal
          onClose={() => setShowSortModal(false)}
          onSortChange={setSortOption}
          selectedSort={sortOption}
        />
      )}

      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {sortedPlants.length === 0 ? (
        <p className="no-results-message">Aucune plante trouvée.</p>
      ) : (

      <section className="plant-gallery">
        {sortedPlants.slice(0, visibleCount).map((plant) => (
          <div key={plant.id} className="plant-card">
            <Link to={`/plant/${plant.id}`}>
              <div className="plant-image-wrapper">
                <img
                  src={`http://localhost:5002/images/${plant.image}`}
                  alt={plant.name}
                />
                <div className="overlay">Voir l'article</div>
              </div>
            </Link>
            <button
              type="button"
              className="favorite-btn"
              onClick={() => toggleFavorite(plant.id)}
            >
              <FaHeart
                style={{
                  color: favorites.includes(plant.id) ? "#3A9D23" : "#FFFFFF",
                }}
                size={21}
              />
            </button>
            <div className="plant-info">
              <h3>{plant.name}</h3>
              <div className="stars">★★★★★</div>
              <p>{Number(plant.price).toFixed(2)} €</p>
            </div>
          </div>
        ))}
      </section>
      )}
      {visibleCount < sortedPlants.length && (
        <div className="show-more-container">
          <button
            type="button"
            className="show-more-btn"
            onClick={handleShowMore}
          >
            Voir plus
          </button>
        </div>
      )}
    </>
  );
}

export default PlantGallery;
