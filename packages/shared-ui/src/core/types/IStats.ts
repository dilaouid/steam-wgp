export interface IStats {
    players: number;
    games: number;
    matches: number;
    steamders: number;
    podium: {
        game_id: number;
        score: number;
    }[]
};