import { useQuery } from "@tanstack/react-query";
import { gameQueries } from "@core/API/games";
import { TQueryParams } from "@/core/API/games/types";

export const useGames = (params: TQueryParams) => {
    return useQuery({
      queryKey: ['games', params],
      queryFn: () => gameQueries.list(params),
      select: (data) => data.data,
      staleTime: Infinity,
      retry: 1
    });
}