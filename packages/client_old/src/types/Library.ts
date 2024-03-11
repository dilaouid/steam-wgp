export interface IGame {
    game_id: string;
    hidden: boolean;
}

export interface ILibrary {
    games: IGame[];
    selected?: string[];
}