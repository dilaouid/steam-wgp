import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '@core/services/API/global/stats/fetchStats';

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: fetchStats,
        select: (data) => data.data
    });
};