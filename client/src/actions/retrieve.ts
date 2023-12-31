import { RoomInfo } from "../types/Room";

export const retrieve = (setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>, swipedGames: string[]) => {
    const swipped = swipedGames.map(game => parseInt(game));
    setRoom((prev: RoomInfo | null) => {
        if (!prev) return prev;
        return { 
            ...prev,
            commonGames: prev.commonGames.filter(game => !swipped.includes(game)),
            swipedGames: swipped,
        };
    });
}