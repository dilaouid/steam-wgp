import { gameQueries } from "@core/API/games";
import { useQuery } from "@tanstack/react-query";

export const useGame = (id: number) => {
    return useQuery({
      queryKey: ['game', id],
      queryFn: () => gameQueries.get(id),
      retry: 1
    });
}