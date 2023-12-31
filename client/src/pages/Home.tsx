import { useContext, useEffect, useState } from "react";
import SteamLoadingIcon from "../components/common/Home/Loading";
import { checkAuth } from "../api/auth";
import LoginPage from "./Login";
import LoadingPage from "./LoadingPage";

import { Auth, Loading, Room, WebSocket } from "../context";

import FooterComponent from "../components/common/Footer/Footer";
import { useNavigate } from "react-router-dom";
import * as actions from "../actions";

export default function HomePage () {
    const { auth, setAuth } = useContext(Auth.Context)!;
    const { loadingComplete } = useContext(Loading.Context)!;
    const { socket } = useContext(WebSocket.Context)!;
    const { room, setRoom } = useContext(Room.Context)!;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const waitlistId = room?.id;
    const adminId = room?.admin_id;

    if (waitlistId && room.winner) {
      setRoom(null);
      setAuth(prev => ({
        ...prev,
        user: {
          ...prev.user,
          waitlist: null
        }
      }));
    }

    useEffect(() => {
        setIsLoading(true);
        const verifyUser = async () => {
          try {
            const userData = await checkAuth();
            setAuth({ isAuthenticated: true, user: userData });
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Utilisateur non authentifié');
            localStorage.removeItem('animationPlayed');
            setAuth({ isAuthenticated: false, user: { id: '', username: '', waitlist: null } });
            setIsAuthenticated(false);
          }
          setIsLoading(false);
        };
        verifyUser();
    }, [setAuth]);

    useEffect(() => {
      if (!socket) return;
      if (!waitlistId) return;

      socket.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.action === "leave")
            actions.leave(setRoom, data.player)
          else if (data.action === "end")
            actions.end(socket, setRoom, true, navigate, setAuth);
          else if (data.action === "kicked")
            actions.kicked(socket, data.playerId, auth.user?.id, adminId ?? '', setRoom, undefined, setAuth);
          else if (data.action === "start")
            actions.start(setRoom, waitlistId, navigate);
          else if (data.action === "retrieve")
              actions.retrieve(setRoom, data.swipedGames);
      }
    }, [ socket, waitlistId, adminId, setRoom, auth.user?.id, navigate, setAuth ]);

    return (
      <div>
        <section className="py-4 py-xl-5">
            { isLoading ? <SteamLoadingIcon /> : isAuthenticated ? <LoadingPage /> : <LoginPage /> }
        </section>
        { !isLoading && loadingComplete ? <FooterComponent /> : '' }
      </div>
    );
}