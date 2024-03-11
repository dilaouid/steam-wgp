import { PlayerInfo } from "../types/Player";
import { RoomInfo } from "../types/Room";

export const update = (setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>, player: PlayerInfo, commonGames: string[]) => {
    const commons = commonGames.map(game => parseInt(game));
    
    setRoom((prev: RoomInfo | null) => {
        if (!prev) return prev;
        return { 
            ...prev,
            players: prev.players.map(p => {
                if (p.player_id === player.player_id) {
                    return { ...p, games: player.games };
                }
                return p;
            }),
            commonGames: commons,
        };
    });
}