import { useQuery } from "@tanstack/react-query";
import { countSteamders } from "@core/services/API/steamders/count";

export const useCountSteamders = () => {
    return useQuery({
        queryKey: ["steamders", "count"],
        queryFn: countSteamders,
        select: (data) => data.data.count[0].count
    });
};