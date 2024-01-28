interface IGame {
    game_id: string;
    hidden: boolean;
}

export interface ILibrary {
    library: IGame[];
    selected?: string[];
}