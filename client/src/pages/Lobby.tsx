import { useContext, useEffect, useState } from 'react';

import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { checkAuth } from '../api/auth';
import { useNavigate } from 'react-router-dom';

import { getWaitlistInformations } from '../api/lobby';

import FooterComponent from '../components/common/Footer/Footer';
import SteamLoadingIcon from '../components/common/Home/Loading';

import { Room, Auth, Loading } from '../context';

import WaitingPage from './WaitingPage';
import { calculateCommonGames } from '../utils/getCommonGames';
import { getCookieValue } from '../utils/getCookie';
import { useWebSocket } from '../context/useWebSocket';

export default function LobbyPage() {
    const { id } = useParams();
    const { setAuth, auth } = useContext(Auth.Context)!;
    const { setLoadingComplete, loadingComplete } = useContext(Loading.Context)!;
    const { room, setRoom } = useContext(Room.Context)!;
    const socket = useWebSocket();

    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            const verifyUser = async () => {
                try {
                    const userData = await checkAuth();
                    setAuth({ isAuthenticated: true, user: userData });
                    setLoadingComplete(true);
                } catch (error) {
                    console.error('Utilisateur non authentifié');
                    navigate('/');
                }
            };
            verifyUser();
        }
    }, [ auth.isAuthenticated, setLoadingComplete, setAuth, navigate ]);

    useEffect(() => {
        const loadRoomInfo = async () => {
            try {
                const info = await getWaitlistInformations(id as string);
                setRoom(calculateCommonGames(info.data));
            } catch (error) {
                console.error('Erreur lors du chargement des informations de la room:', error);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        loadRoomInfo();
    }, [ id, navigate, setRoom ]);

    useEffect(() => {
        if (!socket?.socket) return;
        const token = getCookieValue('token');
        const waitlistId = room?.id;

        if (!waitlistId || !token) return;

        socket.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.action === "join") {
                console.log('New player joined! Welcome to', data.player.username);
                setRoom((prev) => {
                    if (!prev) return prev;

                    // don't add the player if he's already in the room
                    const isPlayerAlreadyInRoom = prev.players.some(player => player.player_id === data.player.player_id);
                    
                    if (isPlayerAlreadyInRoom) {
                        console.log('Player is already in the room');
                        return prev;
                    }
        

                    // Update the state with the new player and the new common games
                    return { 
                        ...prev, 
                        players: [...prev.players, data.player],
                        commonGames: calculateCommonGames({
                            ...prev, 
                            players: [...prev.players, data.player]
                        })!.commonGames
                    };
                });
            }

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
                console.log('Room has been closed');
                setRoom(null);
                socket.socket?.close();
                navigate('/');
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
                    setRoom(null);
                    socket.socket?.close();
                    navigate('/');
                    toast.warning("Vous avez été expulsé de la room", {
                        position: "bottom-right",
                        autoClose: 2500,
                        closeOnClick: true,
                        theme: "colored",
                        hideProgressBar: true,
                    });
                } else {
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
        };

        return () => {
            console.log('Closing socket');
            socket.socket?.close();
        };
    }, [setRoom, room?.id, socket, navigate, auth.user?.id]);

    return(
    <div>
        <section className="py-4 py-xl-5">
            { isLoading ? <SteamLoadingIcon /> : <WaitingPage /> }
        </section>
        { !isLoading && loadingComplete ? <FooterComponent /> : '' }
    </div>)
}