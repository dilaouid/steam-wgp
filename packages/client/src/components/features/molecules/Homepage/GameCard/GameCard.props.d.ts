export interface GameCardProps {
    size: 'large' | 'small';
    color: string;
    score: { score: number, game_id: number } | null;
}