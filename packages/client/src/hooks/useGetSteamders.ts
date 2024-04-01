import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchSteamders } from '../services/api/waitlists/search';

export const useGetSteamders = (page: number) => {
  return useQuery({
    queryKey: ['steamders', page],
    queryFn: () => searchSteamders(page),
    select: (data) => data.data,
    placeholderData: keepPreviousData
  });
};