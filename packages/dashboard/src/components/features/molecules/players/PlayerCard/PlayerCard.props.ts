export interface IPlayerCardProps {
    id: string;
    username: string;
    avatar_hash: string;
    stats: {
        library_size: number;
        steamders_completed: number;
        has_active_steamder: boolean;
        is_admin?: boolean;
    };
}