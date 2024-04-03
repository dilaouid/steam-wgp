import { ISteamder } from "../types/ISteamder";

export const calculateCommonGames = (steamder: ISteamder): number[] | null => {
    if (steamder.players.length === 0)
        return null;
    let commonGames = steamder.players[0].games;

    steamder.players.forEach(player => {
        const filtered = commonGames.filter(game => player.games.includes(game));
        // shuffling the array to make it more random
        commonGames = filtered.sort(() => Math.random() - 0.5);
    });

    return commonGames;
}