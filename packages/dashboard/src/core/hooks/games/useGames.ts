import { gameQueries, TQueryParams } from "@core/API/games";
import { useQuery } from "@tanstack/react-query";

export const useGames = (params: TQueryParams) => {
    return useQuery({
      queryKey: ['games', params],
      queryFn: () => gameQueries.list(params),
      select: (data) => data.data,
      staleTime: Infinity,
      retry: 1
    });
}