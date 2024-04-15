import { useSteamderStore } from "../../../store/steamderStore";
import { IPlayer } from "../../../types/ISteamder";
import { calculateAllGames } from "../../../utils/calculateAllGames";

export const updateSteamder = (player: IPlayer, commonGames: number[]) => {
    const { steamder, setSteamder } = useSteamderStore.getState();
    if (!steamder) return;

    const updatedPlayers = steamder.players.map(p => p.player_id === player.player_id ? { ...p, games: player.games } : p);
    const commonGamesLength = commonGames.length;
    const allGamesLength = calculateAllGames(updatedPlayers);

    setSteamder({
        ...steamder,
        players: updatedPlayers,
        common_games: commonGamesLength,
        all_games: allGamesLength
    });
}