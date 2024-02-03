import GameCardComponent from "./GameCard";
import { Library } from "../../../context";
import { IGame } from "../../../types/Library";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, Tab } from "react-bootstrap";

export default function LibraryContainerComponent() {
    const { library } = useContext(Library.Context)!;
    const { t } = useTranslation();

    let delay = 0;
    return(
    <div className="container">
        <p className="text-center">{t('library_heading')}</p>
        <Tabs defaultActiveKey="all" id="library-tabs" className="mb-3" fill>
            <Tab eventKey="all" title={t('all_games')}>
                <div className="row g-0 justify-content-center">
                    { library?.games.map((game: IGame, index: number) => {
                        delay = delay > 2.9 ? 0 : delay + 0.1;
                        return (
                            <GameCardComponent delay={delay.toString()} key={index} id={game.game_id} hide={game.hidden} />
                        )
                    }) }
                </div>
            </Tab>
            <Tab eventKey="public" title={t('public_games')}>
                <div className="row g-0 justify-content-center">
                    { library?.games.filter(game => !game.hidden).map((game: IGame, index: number) => {
                        return (
                            <GameCardComponent delay={"0"} key={index} id={game.game_id} hide={game.hidden} />
                        )
                    }) }
                </div>
            </Tab>
            <Tab eventKey="hidden" title={t('hidden_games')}>
                <div className="row g-0 justify-content-center">
                    { library?.games.filter(game => game.hidden).map((game: IGame, index: number) => {
                        return (
                            <GameCardComponent delay={"0"} key={index} id={game.game_id} hide={game.hidden} />
                        )
                    }) }
                </div>
            </Tab>
            <Tab eventKey="selected" title={t('selected_games')}>
                <div className="row g-0 justify-content-center">
                    { library?.games.filter(game => library?.selected?.includes(game.game_id)).map((game: IGame, index: number) => {
                        return (
                            <GameCardComponent delay={"0"} key={index} id={game.game_id} hide={game.hidden} />
                        )
                    }) }
                </div>
            </Tab>
        </Tabs>
    </div>)
}