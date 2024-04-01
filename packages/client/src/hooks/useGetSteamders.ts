import { useQuery } from '@tanstack/react-query';
import { searchSteamders } from '../services/api/waitlists/search';

export const useGetSteamders = (page: number) => {
  return useQuery({
    queryKey: ['get', 'steamders'],
    queryFn: () => searchSteamders(page),
    select: (data) => data.data
  });
};