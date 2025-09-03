import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import MenuPage from './pages/MenuPage.tsx'
import NavBar from './componets/NavBar.tsx'
import GamePage from './pages/GamePage.tsx'
import EditRiddlesPage from './pages/EditRiddlesPage.tsx'
import LeaderBoardPage from './pages/LeaderBoardPage.tsx'
import TokenSaveProvider from './auth/AuthContext.tsx'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.tsx'
import ProtectedRouteUser from './ProtectedRoute/ProtectedRoute.tsx'
import { RiddlesProvider } from './dal/UseRiddles.tsx'

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  return (
    <TokenSaveProvider>
      <RiddlesProvider>

      {showNavBar && <NavBar />}
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/" element={<ProtectedRoute />}>

            <Route path="/menu" element={<MenuPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            
            <Route path="/" element={<ProtectedRouteUser />}>
            <Route path="/edit-riddles" element={<EditRiddlesPage />} />
            </Route>

          </Route>
        </Routes>
        
      </RiddlesProvider>
    </TokenSaveProvider>
  )
}

export default App
