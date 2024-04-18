import { PlayerInfo } from "./IPlayerInfo";

export interface Waitlist {
    adminId: string;
    players: PlayerInfo[];
    playerGames: Record<string, number[]>;
    commonGames: number[];
    swipedGames: Record<number, string[]>;
    display_all_games: boolean;
    started: boolean;
    ended: boolean;
    winner?: number;
    endTime?: number;
    sockets: Set<any>;
}