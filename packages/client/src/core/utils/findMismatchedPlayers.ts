import type { ISteamder } from "@core/types/ISteamder";

interface IMismatchedPlayers {
    player1: string;
    player2: string;
}

export const findMismatchedPlayers = (steamder: ISteamder): IMismatchedPlayers[] => {
    if (!steamder || steamder.players?.length < 2) return [];

    const mismatchMessages: IMismatchedPlayers[] = [];

    for (let i = 0; i < steamder.players?.length; i++) {
        for (let j = i + 1; j < steamder.players.length; j++) {
            const player1 = steamder.players[i];
            const player2 = steamder.players[j];

            const commonGames = player1.games.filter(game => player2.games.includes(game));
            if (commonGames.length === 0) {
                mismatchMessages.push({player1: player1.username, player2: player2.username});
            }
        }
    }
    return mismatchMessages;
};