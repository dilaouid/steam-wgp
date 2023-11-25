import './App.css'

import AOS from 'aos';      // AOS animations
import 'bootswatch/dist/cyborg/bootstrap.min.css'; // Bootswatch theme
import 'aos/dist/aos.css'; // AOS styles
import 'animate.css';      // Animate.css styles

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { useEffect } from 'react';

import LoginPage from './pages/Login';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
    </Router>
  )
}

export default App
