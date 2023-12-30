import { toast } from "react-toastify";
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
            toast.warn("Vous avez été expulsé de la room", {
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
                toast.warn("Un joueur a été expulsé de la room", {
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
                    players: prev.players.filter(player => player.player_id !== playerId),
                    commonGames: calculateCommonGames({
                        ...prev, 
                        players: prev.players.filter(player => player.player_id !== playerId)
                    })!.commonGames
                };
            });
        }
};