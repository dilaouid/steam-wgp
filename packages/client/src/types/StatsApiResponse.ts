export interface StatsApiResponse {
    data: {
      players: number;
      games: number;
      waitlists: number;
      matches: number;
    };
    message: string;
}