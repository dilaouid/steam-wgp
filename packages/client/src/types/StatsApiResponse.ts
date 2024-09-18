export interface StatsApiResponse {
    data: {
      players: number;
      games: number;
      steamders: number;
      matches: number;
    };
    message: string;
}