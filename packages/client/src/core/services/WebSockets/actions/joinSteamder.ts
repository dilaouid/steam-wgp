import { queryClient } from "@core";
import { useSteamderStore } from "@store/steamderStore";
import { calculateAllGames, calculateCommonGames } from "@utils";

import type { IPlayer } from "@core/types/ISteamder";

/**
 * A player join the steamder room
 * 
 * @returns void
 */
export const joinSteamder = (player: IPlayer) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    if (!steamder) return;

    const isPlayerAlreadyInRoom = steamder.players.some(current => current.player_id === player.player_id);
    queryClient.invalidateQueries({ queryKey: ["steamders"] });
    if (isPlayerAlreadyInRoom)
        return steamder;

    const allPlayers = [...steamder.players, player];

    const common_games = calculateCommonGames({ ...steamder, players: [...steamder.players, player] }) || [];
    const all_games = calculateAllGames(allPlayers);
    setSteamder({ 
        ...steamder, 
        players: [...steamder.players, player],
        common_games,
        all_games,
        swiped_games: steamder.swiped_games || []
    });
}