import './App.css'

import AOS from 'aos';      // AOS animations
import 'bootswatch/dist/cyborg/bootstrap.min.css'; // Bootswatch theme
import 'aos/dist/aos.css'; // AOS styles
import 'animate.css';      // Animate.css styles
import { AuthProvider } from './context/AuthProvider';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { useEffect } from 'react';
import HomePage from './pages/Home';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
