import { toast } from "react-toastify";
import i18n from 'i18next';
import { State } from "../context/AuthProvider";
import { RoomInfo } from "../types/Room";
import { NavigateFunction } from "react-router-dom";
import { calculateCommonGames } from "../utils/getCommonGames";

export const kicked = (
    socket: WebSocket,
    playerId: string,
    loggedUserId: string,
    adminId: string,
    setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>,
    navigate?: NavigateFunction,
    setAuth?: React.Dispatch<React.SetStateAction<State>>,
    ) => {
        if (playerId === loggedUserId) {
            toast.warn(i18n.t('you_have_been_kicked'), {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                theme: "colored",
                hideProgressBar: true,
            });
            setRoom(null);
            if (setAuth) {
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
            }
            socket.close();
            if (navigate)
                navigate('/');
        } else {
            if (adminId !== loggedUserId) {
                toast.warn(i18n.t('player_has_been_kicked'), {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    theme: "colored",
                    hideProgressBar: true,
                });
            }
            setRoom((prev) => {
                if (!prev) return prev;
                const common = calculateCommonGames({ ...prev, players: prev.players.filter(player => player.player_id !== playerId) }) || [];
                return { 
                    ...prev, 
                    players: prev.players.filter(player => player.player_id !== playerId),
                    commonGames: common
                };
            });
        }
};