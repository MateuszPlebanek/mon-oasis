import { Routes, Route } from 'react-router-dom'
import WelcomeBanner from './components/WelcomeBanner'
import Footer from './components/Footer'
import Home from './pages/Home'
import PlantDetail from './pages/PlantDetail'

function App() {
  return (
    <>
      <WelcomeBanner />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/plant/:id' element={<PlantDetail />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App