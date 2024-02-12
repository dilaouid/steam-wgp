import { RoomInfo } from "../types/Room";

export const calculateCommonGames = (room: RoomInfo): number[] | null => {
    if (room.players.length === 0)
        return null;
    let commonGames = room.players[0].games;

    room.players.forEach(player => {
        const filtered = commonGames.filter(game => player.games.includes(game));
        // shuffling the array to make it more random
        commonGames = filtered.sort(() => Math.random() - 0.5);
    });

    return commonGames;
}