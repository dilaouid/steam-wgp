import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '@core/services/api/global/stats/statsApi';

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: fetchStats,
        select: (data) => data.data
    });
};