import '../styles/SortFilterModal.css'

type Props = {
  onClose: () => void
  onSortChange: (value: string) => void
  selectedSort: string
}

function SortFilterModal({ onClose, onSortChange, selectedSort }: Props) {
  return (
    <div className="modal-overlay">
    <div className="modal-blur" />
      <div className="modal-container">
        <button type="button" className="close-btn" onClick={onClose}>✖</button>
        <h2>Trier par</h2>
        <form className="sort-options">
          <label>
            <input
              type="radio"
              name="sort"
              value="asc"
              checked={selectedSort === 'asc'}
              onChange={(e) => onSortChange(e.target.value)}
            />
            Prix croissant
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="desc"
              checked={selectedSort === 'desc'}
              onChange={(e) => onSortChange(e.target.value)}
            />
            Prix décroissant
          </label>
        </form>
        <button type="button" className="validate-btn" onClick={onClose}>Valider</button>
      </div>
    </div>
  )
}

export default SortFilterModal
