import { ISteamder } from "../types/ISteamder";

export const calculateCommonGames = (steamder: ISteamder): number[] | null => {
    if (steamder.players.length === 0)
        return null;
    const gamesByPlayer = new Map(steamder.players.map(player => [player.player_id, new Set(player.games)]));

    const allGamesSets = Array.from(gamesByPlayer.values());
    let commonGames = allGamesSets[0];

    allGamesSets.slice(1).forEach(gamesSet => {
        commonGames = new Set([...commonGames].filter(game => gamesSet.has(game)));
    });

    // shuffle the common games to avoid the same games being displayed first
    commonGames = new Set([...commonGames].sort(() => Math.random() - 0.5));

    return Array.from(commonGames);
}