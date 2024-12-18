import { useQuery } from '@tanstack/react-query';
import { getLibrary } from '@services/api/players/getLibraryApi';

export const useGetLibrary = () => {
    return useQuery({
        queryKey: ['library', 'get'],
        queryFn: getLibrary,
        select: (data) => data.data
    });
};