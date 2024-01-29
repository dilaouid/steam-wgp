import { useContext, useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { checkAuth } from '../api/auth';

import { getWaitlistInformations } from '../api/lobby';

import FooterComponent from '../components/common/Footer/Footer';
import SteamLoadingIcon from '../components/common/Home/Loading';

import { Room, Auth, Loading, WebSocket } from '../context';

import WaitingPage from './WaitingPage';
import { calculateCommonGames } from '../utils/getCommonGames';
import GamePage from './GamePage';
import * as actions from '../actions';

export default function LobbyPage() {
    const { id } = useParams();
    const { setAuth, auth } = useContext(Auth.Context)!;
    const { setLoadingComplete, loadingComplete } = useContext(Loading.Context)!;
    const { room, setRoom } = useContext(Room.Context)!;
    const { socket } = useContext(WebSocket.Context)!;

    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const navigate = useNavigate();
    const waitlistId = room?.id;
    const adminId = room?.admin_id;

    useEffect(() => {
        if (!auth.isAuthenticated) {
            const verifyUser = async () => {
                try {
                    const userData = await checkAuth();
                    setAuth({ isAuthenticated: true, user: userData });
                    setLoadingComplete(true);
                } catch (error) {
                    console.error('Utilisateur non authentifié');
                    navigate('/steam-wgp/');
                }
            };
            verifyUser();
        }
    }, [ auth.isAuthenticated, setLoadingComplete, setAuth, navigate ]);

    useEffect(() => {
        if (!id) return;
        const loadRoomInfo = async () => {
            try {
                const info = await getWaitlistInformations(id as string, setAuth);
                setRoom(prev => {
                    const common = calculateCommonGames(info.data);
                    return {
                        ...prev,
                        ...info.data,
                        commonGames: common
                    };
                });
            } catch (error) {
                console.error('Erreur lors du chargement des informations de la room:', error);
                navigate('/steam-wgp/');
            } finally {
                setIsLoading(false);
            }
        };

        loadRoomInfo();
    }, [ id, navigate, setRoom, room?.started, setAuth ]);

    useEffect(() => {
        if (!socket) return;
        if (!waitlistId) return;

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.action === "join")
                actions.join(setRoom, data.player);
            else if (data.action === "leave")
                actions.leave(setRoom, data.player)
            else if (data.action === "end")
                actions.end(socket, setRoom, false, navigate);
            else if (data.action === "kicked")
                actions.kicked(socket, data.playerId, auth.user?.id, adminId ?? '', setRoom, navigate, setAuth);
            else if (data.action === "start")
                actions.start(setRoom);
            else if (data.action === "gameEnd")
                actions.gameEnd(setRoom, setAuth, data.winner);
            else if (data.action === "retrieve")
                actions.retrieve(setRoom, data.swipedGames);
        };

    }, [setAuth, setRoom, waitlistId, socket, navigate, auth.user?.id, adminId]);

    return(
    <div>
        <section className="py-4 py-xl-5">
            {isLoading ? (
                <SteamLoadingIcon />
            ) : room?.started ? (
                <GamePage />
            ) : (
                <WaitingPage />
            )}
        </section>
        { !isLoading && loadingComplete ? <FooterComponent /> : '' }
    </div>)
}