import './App.css'

import AOS from 'aos';      // AOS animations
import 'bootswatch/dist/cyborg/bootstrap.min.css'; // Bootswatch theme
import 'aos/dist/aos.css'; // AOS styles
import 'animate.css';      // Animate.css styles
import { AuthProvider } from './context/AuthProvider';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { useEffect } from 'react';
import HomePage from './pages/Home';
import { LoadingProvider } from './context/LoadingProvider';
import LogoutPage from './pages/Logout';
import LobbyPage from './pages/Lobby';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/waitlist/:id" element={<LobbyPage />} />
            </Routes>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  )
}

export default App
