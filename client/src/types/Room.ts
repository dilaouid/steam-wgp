import { PlayerInfo } from "./Player";

export interface RoomInfo {
    admin_id: string;
    id: string;
    started: boolean;
    commonGames: number[];
    players: PlayerInfo[];
    updated_at: Date;
    created_at: Date;
}