import './App.css'

import AOS from 'aos';      // AOS animations
import 'bootswatch/dist/cyborg/bootstrap.min.css'; // Bootswatch theme
import 'aos/dist/aos.css'; // AOS styles
import 'animate.css';      // Animate.css styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import HomePage from './pages/Home';
import LogoutPage from './pages/Logout';
import LobbyPage from './pages/Lobby';
import NavbarComponent from './components/common/Navbar/Navbar';


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Auth, Room, Loading, WebSocket } from './context';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Auth.Provider>
      <Loading.Provider>
        <Room.Provider>
          <WebSocket.Provider>
            <Router>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    closeButton={false}
                    theme="colored"
                />
                <NavbarComponent />
                <Routes>
                  <Route path="/" element={
                      <HomePage />
                  } />
                  <Route path="/logout" element={<LogoutPage />} />
                  <Route path="/waitlist/:id" element={<LobbyPage />} />
                </Routes>
            </Router>
          </WebSocket.Provider>
        </Room.Provider>
      </Loading.Provider>
    </Auth.Provider>
  )
}

export default App
