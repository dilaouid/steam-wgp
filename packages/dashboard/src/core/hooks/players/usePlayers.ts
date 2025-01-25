import { useQuery } from "@tanstack/react-query";
import { playerQueries } from "@core/API/players";
import { TQueryParams } from "@/core/API/players/types";

export const usePlayers = (params: TQueryParams) => {
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value != null)
    );
    return useQuery({
        queryKey: ['players', cleanParams],
        queryFn: () => playerQueries.list(cleanParams),
        select: (data) => data.data,
        staleTime: Infinity,
        retry: 1
    });
}