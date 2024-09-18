import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchSteamders } from '../services/api/steamders/search';

export const useGetSteamders = (page: number) => {
  return useQuery({
    queryKey: ['steamders', page],
    queryFn: () => searchSteamders(page),

    // used for development purposes
    /* queryFn: () => {
      // Simuler la réponse de l'API pour le développement
      return new Promise(resolve => {
          setTimeout(() => {
              const simulatedData = {
                  data: Array.from({ length: 8 }, (_, i) => ({
                      id: `steamder_${page}_${i + 1}`,
                      name: `Steamder ${i + 1}`,
                      player_count: Math.floor(Math.random() * 10) + 1,
                      games: Math.floor(Math.random() * 10) + 1,
                  })),
              };
              resolve(simulatedData);
          }, 1000);
      });
    }, */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (data) => data.data,
    placeholderData: keepPreviousData,
    staleTime: Infinity
  });
};