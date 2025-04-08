import '../styles/Footer.css'
import { FaFacebook, FaPinterest, FaInstagram} from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <p className="footer-title">Suivez-nous</p>
                    <div className="footer-icons">
                        <FaFacebook className="social-icon facebook" />
                        <FaPinterest className="social-icon pinterest" />
                        <FaInstagram className="social-icon instagram" />
                    </div>

                <p className="footer-copy">© 2025 Mon Oasis - Tous droits réservé</p>
                </div>
                <div className="footer-right">
                    <Link to="/a-propos">Qui sommes-nous ?</Link>
                    <Link to="/mentions-legales">Mentions légales</Link>
                    <Link to="/confidentialite">Politique de confidentialité</Link>
                    <Link to ="/contact">Contact</Link>
                    <p className="footer-contact">monoasis@projet.com</p>
                    <p className="footer-contact">+33 1 25 30 45 44</p>
                    </div>
            </div>
    </footer>
    )
}
export default Footer