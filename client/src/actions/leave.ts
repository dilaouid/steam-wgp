import { PlayerInfo } from "../types/Player";
import { RoomInfo } from "../types/Room";
import { calculateCommonGames } from "../utils/getCommonGames";

export const leave = (setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>, player: PlayerInfo) => {
    setRoom((prev: RoomInfo | null) => {
        if (!prev) return prev;
        return { 
            ...prev, 
            players: prev.players.filter((current: PlayerInfo) => current.player_id !== player.player_id),
            commonGames: calculateCommonGames({
                ...prev, 
                players: prev.players.filter((current: PlayerInfo) => current.player_id !== player.player_id)
            })!.commonGames
        };
    });
}