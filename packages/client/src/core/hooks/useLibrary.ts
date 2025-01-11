import { useQuery } from '@tanstack/react-query';
import { getLibrary } from '@core/services/API/players/getLibrary';

export const useGetLibrary = () => {
    return useQuery({
        queryKey: ['library', 'get'],
        queryFn: getLibrary,
        select: (data) => data.data
    });
};