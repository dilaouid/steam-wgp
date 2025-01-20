import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { fetchStats } from "@core/API";
import { IStats } from "@core/types";

interface StatsResponse {
  data: IStats;
}

const defaultStats: IStats = {
  games: 0,
  matches: 0,
  players: 0,
  podium: [],
  steamders: 0,
};

const initialData: StatsResponse = {
  data: defaultStats,
};

export const useStats = (config: {
  baseUrl: string;
}): UseQueryResult<IStats, Error> => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetchStats(config.baseUrl);
      return response;
    },
    select: (response: StatsResponse) => response.data,
  });
};