import { useEffect, useRef, useState } from 'react'
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa'
import logo from '../assets/logo.png'
import '../styles/WelcomeBanner.css'

function WelcomeBanner() {
  const [showBanner, setShowBanner] = useState(true)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null) // ref pour gérer le focus manuellement

  // Masquer la bannière au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { setShowBanner(false)
    } else {
      setShowBanner(true)
    }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer la barre de recherche si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchBar(false)
      }
    }

    if (showSearchBar) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSearchBar])

  // Donner le focus au champ de recherche quand il apparaît
  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showSearchBar])

  return (
    <header className="welcome-header py-3 shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <img src={logo} alt="Mon Oasis" width="40" height="40" />
          <span className="h4 text-success m-0">Mon Oasis</span>
        </div>

        {showSearchBar ? (
          <div className="flex-grow-1 mx-4" ref={searchRef}>
            <input
              ref={inputRef} // 👈 Ici on applique le focus
              type="text"
              className="form-control"
              placeholder="Rechercher une plante..."
            />
          </div>
        ) : (
          <div className="d-flex gap-3 fs-5 text-success">
            <FaSearch
              onClick={() => setShowSearchBar(true)}
              style={{ cursor: 'pointer' }}
              title="Rechercher"
            />
            <FaShoppingCart style={{ cursor: 'pointer' }} title="Panier" />
            <FaUser style={{ cursor: 'pointer' }} title="Connexion" />
          </div>
        )}
      </div>

      {showBanner && (
        <div className="text-center mt-4">
          <h1 className="big-title text-success text-center">Bienvenue sur<br /> Mon Oasis</h1>
          <p className="text-muted banner-subtitle">Explorer notre sélection de plantes<br className="mobile-line-break" /> pour créer votre coin de verdure </p>
        </div>
      )}
    </header>
  )
}

export default WelcomeBanner

