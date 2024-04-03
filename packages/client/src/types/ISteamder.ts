export interface IPlayer {
    player_id: string;
    username: string;
    avatar_hash: string;
    games: number[]
}

export interface ISteamder {
    id: string;
    name: string;

    admin_id: string;
    all_games: number;
    common_games: number;

    players: IPlayer[];

    display_all_games: boolean;
    private: boolean;
    started: boolean;
    complete: boolean;

    created_at: Date;
    updated_at: Date;
}