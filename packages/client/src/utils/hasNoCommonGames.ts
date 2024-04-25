import { IPlayer, ISteamder } from "../types/ISteamder";

export const hasNoCommonGamesWithAnyone = (steamder: ISteamder, player: IPlayer) => {
    return steamder.players.some(otherPlayer => {
        if (otherPlayer.player_id === player.player_id)
            return false;

        return !player.games.some(game => otherPlayer.games.includes(game));
    });
};