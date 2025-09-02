import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import MenuPage from './pages/MenuPage.tsx'
import NavBar from './componets/NavBar.tsx'
import GamePage from './pages/GamePage.tsx'
import EditRiddlesPage from './pages/EditRiddlesPage.tsx'
import LeaderBoardPage from './pages/LeaderBoardPage.tsx'

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  return (
    <>
      {showNavBar && <NavBar />}
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/edit-riddles" element={<EditRiddlesPage />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
        </Routes>
      
    </>
  )
}

export default App
