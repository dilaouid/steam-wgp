export interface IPlayerSteamderMember {
    id: string;
    username: string;
    avatar_hash: string;
}

export interface ICompletedSteamder {
    steamder_id: string;
    completed_at: Date;
    name: string;
    private: boolean;
    selected: number;
    total_games: number;
    admin_id: string;
    members: IPlayerSteamderMember[];
}

export interface ICurrentSteamder {
    steamder_id: string;
    name: string;
    started: boolean;
    private: boolean;
    complete: boolean;
    selected: number;
    display_all_games: boolean;
    common_games: number;
    all_games: number;
    created_at: Date;
    updated_at: Date;
    admin_id: string;
    members: IPlayerSteamderMember[];
}

export interface IPlayerDetails { 
    id: string;
    username: string;
    avatar_hash: string;
    profileurl: string;
    isAdmin: boolean;
    is_deleted: boolean;
    delete_date: Date | null;
    library: {
        game_id: number;
        hidden: boolean;
    }[];
    completed_steamders: ICompletedSteamder[] | null;
    current_steamder: ICurrentSteamder | null;
}

