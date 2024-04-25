import { IPlayer } from "../types/ISteamder";

export const calculateAllGames = (players: IPlayer[]) => {
    return players.reduce((acc, current) => {
        current.games.forEach((game) => {
            if (!acc.includes(game))
                acc.push(game);
        });
        return acc;
    }, [] as number[]);  
};