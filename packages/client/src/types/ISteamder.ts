export interface IPlayer {
    player_id: string;
    username: string;
    avatar_hash: string;
    profileurl: string;
    games: number[];
}

export interface ISteamder {
    id: string;
    name: string;

    admin_id: string;
    all_games: number[];
    common_games: number[];
    swiped_games: number[];

    players: IPlayer[];

    display_all_games: boolean;
    private: boolean;
    started: boolean;
    complete: boolean;

    endTime?: number;

    created_at: Date;
    updated_at: Date;
}