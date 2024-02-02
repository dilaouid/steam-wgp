import GameCardComponent from "./GameCard";
import { Library } from "../../../context";
import { IGame } from "../../../types/Library";
import { useContext } from "react";

export default function LibraryContainerComponent() {
    const { library } = useContext(Library.Context)!;

    let delay = 0;
    return(
    <div className="container">
        <p className="text-center">Select the games that want to hide from other players when you enters a room.</p>
        <div className="row g-0 justify-content-center">
            { library?.games.map((game: IGame, index: number) => {
                delay = delay > 2.9 ? 0 : delay + 0.1;
                return (
                    <GameCardComponent delay={delay.toString()} key={index} id={game.game_id} hide={game.hidden} />
                )
            }) }
        </div>
    </div>)
}