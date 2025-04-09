import { Routes, Route, useLocation } from 'react-router-dom';
import WelcomeBanner from './components/WelcomeBanner';
import Footer from './components/Footer';
import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';

function App() {
  const location = useLocation(); // 🔍 On récupère l'URL actuelle
  const hideBannerRoutes = ['/auth', '/mon-compte']; // ❌ Routes sans bannière

  return (
    <>
      {/* ✅ Affiche la bannière sauf si on est sur une page à cacher */}
      {!hideBannerRoutes.includes(location.pathname) && <WelcomeBanner />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/mon-compte" element={<AccountPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

