export interface GameCardProps {
    size: 'large' | 'small';
    color: "gold" | "silver" | "#cd7f32"
    score: { score: number, game_id: number } | null;
}