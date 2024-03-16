import { useQuery } from '@tanstack/react-query';
import { fetchStats } from './statsApi';

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: fetchStats,
        select: (data) => data.data,
        refetchOnWindowFocus: false
    });
};