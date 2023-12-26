import { RoomInfo } from "../types/Room";

export const calculateCommonGames = (room: RoomInfo): RoomInfo | null => {
    if (room.players.length === 0)
        return null;
    let commonGames = room.players[0].games;

    room.players.forEach(player => {
        commonGames = commonGames.filter(game => player.games.includes(game));
    });

    room.commonGames = commonGames;
    return room;
}