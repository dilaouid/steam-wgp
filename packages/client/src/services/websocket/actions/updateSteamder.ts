import { useSteamderStore } from "../../../store/steamderStore";
import { IPlayer } from "../../../types/ISteamder";

export const updateSteamder = (player: IPlayer, commonGames: number[]) => {
    const { steamder, setSteamder } = useSteamderStore.getState();
    if (!steamder) return;
 
    setSteamder({ ...steamder, common_games: commonGames.length, all_games: steamder.players.reduce((acc, current) => acc + current.games.length, 0), players: steamder.players.map(p => {
        if (p.player_id === player.player_id)
            return { ...p, games: player.games };
        return p;
    }) });
}