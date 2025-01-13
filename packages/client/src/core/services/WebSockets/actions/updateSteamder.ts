import { queryClient } from "@core/.";
import { useSteamderStore } from "@store/steamderStore";
import { calculateAllGames } from "@core/utils/calculateAllGames";

import type { IPlayer } from "@core/types/ISteamder";

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