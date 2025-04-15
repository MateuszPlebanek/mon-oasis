import '../styles/SortFilterModal.css' // on réutilise les styles existants

type Props = {
  onClose: () => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

function FilterModal({ onClose, selectedCategory, onCategoryChange }: Props) {
  const categories = ['Tropicale', 'Succulente', 'Déco'] // tu peux modifier selon ta BDD

  return (
    <div className="modal-overlay">
      <div className="modal-blur" />
      <div className="modal-container">
        <button type="button" className="close-btn" onClick={onClose}>✖</button>
        <h2>Filtrer par catégorie</h2>
        <form className="sort-options">
          {categories.map((cat) => (
            <label key={cat}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={(e) => onCategoryChange(e.target.value)}
              />
              {cat}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={() => onCategoryChange('')}
            />
            Toutes les catégories
          </label>
        </form>
        <button type="button" className="validate-btn" onClick={onClose}>Valider</button>
      </div>
    </div>
  )
}

export default FilterModal
