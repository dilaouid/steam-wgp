import GameCardComponent from "./GameCard";
import { Library } from "../../../context";
import { IGame } from "../../../types/Library";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function LibraryContainerComponent() {
    const { library } = useContext(Library.Context)!;
    const { t } = useTranslation();

    let delay = 0;
    return(
    <div className="container">
        <p className="text-center">{t('library_heading')}</p>
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