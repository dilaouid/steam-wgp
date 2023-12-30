import { useContext, useEffect, useState } from "react";
import SteamLoadingIcon from "../components/common/Home/Loading";
import { checkAuth } from "../api/auth";
import LoginPage from "./Login";
import LoadingPage from "./LoadingPage";

import { Auth, Loading, Room, WebSocket } from "../context";

import FooterComponent from "../components/common/Footer/Footer";
import { calculateCommonGames } from "../utils/getCommonGames";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

          if (data.action === "leave") {
            console.log('Player left the room:', data.player.username);
            setRoom((prev) => {
                if (!prev) return prev;
                return { 
                    ...prev, 
                    players: prev.players.filter(player => player.player_id !== data.player.player_id),
                    commonGames: calculateCommonGames({
                        ...prev, 
                        players: prev.players.filter(player => player.player_id !== data.player.player_id)
                    })!.commonGames
                };
            });
          }


          if (data.action === "end") {
            setRoom(null);
            setAuth((prev) => {
                if (!prev) return prev;
                return { 
                    ...prev, 
                    user: { 
                        ...prev.user, 
                        waitlist: null 
                    } 
                };
            });
            socket.close();
            toast.info("L'administrateur a fermé le salon", {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                theme: "colored",
                hideProgressBar: true,
            });
          }

          if (data.action === "kicked") {
            if (data.playerId == auth.user?.id) {
                toast.warn("Vous avez été expulsé de la room", {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    theme: "colored",
                    hideProgressBar: true,
                });
                setRoom(null);
                socket.close();
            } else {
                if (adminId !== auth.user?.id) {
                    toast.info(`Un joueur a été expulsé de la room`, {
                        position: "bottom-right",
                        autoClose: 2500,
                        closeOnClick: true,
                        theme: "colored",
                        hideProgressBar: true,
                    });
                }
                setRoom((prev) => {
                    if (!prev) return prev;
                    return { 
                        ...prev, 
                        players: prev.players.filter(player => player.player_id !== data.playerId),
                        commonGames: calculateCommonGames({
                            ...prev, 
                            players: prev.players.filter(player => player.player_id !== data.playerId)
                        })!.commonGames
                    };
                });
            }
        }

        if (data.action === "start") {
            toast.success("La partie a commencé", {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                theme: "colored",
                hideProgressBar: true,
            });
            setRoom((prev) => {
                if (!prev) return prev;
                return { 
                    ...prev, 
                    started: true
                };
            });
            navigate(`/waitlist/${waitlistId}`);
        }
      }
    }, [socket, waitlistId, adminId, setRoom, auth.user?.id, navigate]);

    return (
      <div>
        <section className="py-4 py-xl-5">
            { isLoading ? <SteamLoadingIcon /> : isAuthenticated ? <LoadingPage /> : <LoginPage /> }
        </section>
        { !isLoading && loadingComplete ? <FooterComponent /> : '' }
      </div>
    );
}