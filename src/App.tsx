import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import MenuPage from './pages/MenuPage.tsx'
import NavBar from './componets/NavBar.tsx'

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  return (
    <>
      {showNavBar && <NavBar />}
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      
    </>
  )
}

export default App
