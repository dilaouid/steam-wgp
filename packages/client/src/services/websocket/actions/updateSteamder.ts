import { queryClient } from "../../../main";
import { useSteamderStore } from "@store/steamderStore";
import { IPlayer } from "../../../types/ISteamder";
import { calculateAllGames } from "@utils/calculateAllGames";

export const updateSteamder = (player: IPlayer, common_games: number[]) => {
    const { steamder, setSteamder } = useSteamderStore.getState();
    if (!steamder) return;

    const updatedPlayers = steamder.players.map(p => p.player_id === player.player_id ? { ...p, games: player.games } : p);
    const all_games = calculateAllGames(updatedPlayers);
    queryClient.invalidateQueries({ queryKey: ["steamders"] });

    setSteamder({
        ...steamder,
        players: updatedPlayers,
        common_games,
        all_games
    });
}