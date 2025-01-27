export type TQueryParams = {
    page?: number;
    limit?: number;
    sort_field?: 'username' | 'steamders_completed' | 'library_size' | 'created_at';
    sort_order?: 'asc' | 'desc';
    search?: string;
    is_admin?: boolean;
    has_active_steamder?: boolean;
    min_games?: number;
};