import { useQuery } from "@tanstack/react-query";
import { playerQueries } from "@core/API/players";

export const usePlayer = (id: number) => {
    return useQuery({
        queryKey: ['player', id],
        queryFn: () => playerQueries.get(id),
        retry: 1
    });
}