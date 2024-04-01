import { useQuery } from "@tanstack/react-query";
import { countSteamders } from "../services/api/waitlists/count";

export const useCountSteamders = () => {
    return useQuery({
        queryKey: ["steamders", "count"],
        queryFn: countSteamders,
        select: (data) => data.data
    });
};