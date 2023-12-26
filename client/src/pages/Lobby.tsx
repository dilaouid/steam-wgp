import { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { checkAuth } from '../api/auth';
import { useNavigate } from 'react-router-dom';

import { getWaitlistInformations } from '../api/lobby';

import FooterComponent from '../components/common/Footer/Footer';
import SteamLoadingIcon from '../components/common/Home/Loading';

import { Room, Auth, Loading } from '../context';

import WaitingPage from './WaitingPage';
import { calculateCommonGames } from '../utils/getCommonGames';
import { connectWebSocket } from '../api/websocket';
import { getCookieValue } from '../utils/getCookie';

export default function LobbyPage() {
    const { id } = useParams();
    const { setAuth, auth } = useContext(Auth.Context)!;
    const { setLoadingComplete, loadingComplete } = useContext(Loading.Context)!;
    const { room, setRoom } = useContext(Room.Context)!;

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
        // get jwt cookie token
        const token = getCookieValue('token');
        if (!room || !token) return;

        const waitlistId = room?.id;
        const socket = connectWebSocket(waitlistId, token);
        
        return () => {
          socket.close();
        };
      }, [room]);    

    return(
    <div>
        <section className="py-4 py-xl-5">
            { isLoading ? <SteamLoadingIcon /> : <WaitingPage /> }
        </section>
        { !isLoading && loadingComplete ? <FooterComponent /> : '' }
    </div>)
}