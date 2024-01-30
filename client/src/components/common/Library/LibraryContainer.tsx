import GameCardComponent from "./GameCard";
import { Library } from "../../../context";
import { IGame } from "../../../types/Library";
import { useContext } from "react";

// function to add or remove the game id from the selected array (from the library context)
const toggleSelected = (id: string, selected: string[]): string[] => {
    if (selected.includes(id)) {
        return selected.filter((gameId) => gameId !== id);
    }
    return [ ...selected, id ];
};

export default function LibraryContainerComponent() {
    const { library } = useContext(Library.Context)!;
    const selected = library?.selected || [];
    let delay = 0;
    return(
    <div className="container">
        <p className="text-center">Select the games that want to hide from other players when you enters a room.</p>
        <div className="row g-0 justify-content-center">
            { library?.games.map((game: IGame, index: number) => {
                delay = delay > 2.9 ? 0 : delay + 0.1;
                return (
                    <GameCardComponent toggle={toggleSelected} delay={delay.toString()} key={index} id={game.game_id} hidden={game.hidden} isSelected={selected.includes(game.game_id)} />
                )
            }) }
        </div>
    </div>)
}