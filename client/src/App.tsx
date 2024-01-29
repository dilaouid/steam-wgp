import './App.css'

import AOS from 'aos';      // AOS animations
import 'bootswatch/dist/cyborg/bootstrap.min.css'; // Bootswatch theme
import 'aos/dist/aos.css'; // AOS styles
import 'animate.css';      // Animate.css styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

import { useEffect } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import HomePage from './pages/Home';
import LogoutPage from './pages/Logout';
import LobbyPage from './pages/Lobby';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/Login';
import LibraryPage from './pages/Library';

import NavbarComponent from './components/common/Navbar/Navbar';


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Auth, Room, Loading, WebSocket, Library } from './context';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Auth.Provider>
      <Loading.Provider>
        <Room.Provider>
          <Library.Provider>
            <WebSocket.Provider>
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
                  <Route path="/steam-wgp/" element={<HomePage />} />
                  <Route path="/steam-wgp/login" element={<LoginPage />} />
                  <Route path="/steam-wgp/logout" element={<LogoutPage />} />
                  <Route path="/steam-wgp/waitlist/:id" element={<LobbyPage />} />
                  <Route path="/steam-wgp/library" element={<LibraryPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </WebSocket.Provider>
          </Library.Provider>
        </Room.Provider>
      </Loading.Provider>
    </Auth.Provider>
  )
}

export default App
