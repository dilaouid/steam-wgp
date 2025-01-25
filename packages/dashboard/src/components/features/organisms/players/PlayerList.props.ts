export interface IPlayerListProps {
    players: Array<{
        id: string;
        username: string;
        avatar_hash: string;
        stats: {
            library_size: number;
            steamders_completed: number;
            has_active_steamder: boolean;
        };
    }>;
    pagination: {
        total: number;
        page: number;
        limit: number;
        total_pages: number;
    };
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}
