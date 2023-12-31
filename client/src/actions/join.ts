import { PlayerInfo } from "../types/Player";
import { RoomInfo } from "../types/Room";
import { calculateCommonGames } from "../utils/getCommonGames";

export const join = (setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>, player: PlayerInfo) => {
    setRoom((prev) => {
        if (!prev) return prev;

        // don't add the player if he's already in the room
        const isPlayerAlreadyInRoom = prev.players.some(current => current.player_id === player.player_id);
        
        if (isPlayerAlreadyInRoom)
            return prev;

        const common = calculateCommonGames({ ...prev, players: [...prev.players, player] }) || [];
        // Update the state with the new player and the new common games
        return { 
            ...prev, 
            players: [...prev.players, player],
            commonGames: common
        };
    });
}