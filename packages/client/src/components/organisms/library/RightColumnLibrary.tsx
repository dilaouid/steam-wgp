import styled from "styled-components";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useLibraryStore } from "../../../store/libraryStore";
import { GameContainer } from "../../molecules/library/GameContainer";

const StyledTabs = styled(Tabs)`
    font-family: 'Archivo Narrow', sans-serif;
`;

const TabRow = styled(Row)`
    background: #060606c5;
    padding: 14px;
`;

const GameColumn = styled(Col)`
    margin-bottom: 20px;
`;

export const RightColumnLibrary: React.FC = () => {
    const { library, selected } = useLibraryStore();
    const publics = library.filter(game => !game.hidden);
    const privates = library.filter(game => game.hidden);

    return(
        <Col>
            <StyledTabs
                defaultActiveKey="all_games"
                id="uncontrolled-tab-example"
                className="mb-3 user-select-none"
                justify
            >
                <Tab eventKey="all_games" title={`Tous vos jeux (${library.length})`}>
                    <TabRow className="g-0" data-aos="zoom-in" data-aos-delay="200">
                        {library.map(game => (
                            <GameColumn sm={6} md={6} lg={3} className="col-6 text-center align-self-center" key={game.game_id}>
                                <GameContainer isselected={selected.includes(game.game_id)} game_id={game.game_id} hidden={game.hidden} />
                            </GameColumn>
                        ))}
                    </TabRow>
                </Tab>

                <Tab eventKey="public_games" title={`Jeux publiques (${publics.length})`}>
                    <TabRow className="g-0" data-aos="zoom-in" data-aos-delay="200">
                        {publics.map(game => (
                            <GameColumn sm={6} md={6} lg={3} className="col-6 text-center align-self-center" key={game.game_id}>
                                <GameContainer isselected={selected.includes(game.game_id)} game_id={game.game_id} hidden={game.hidden} />
                            </GameColumn>
                        ))}
                    </TabRow>
                </Tab>

                <Tab eventKey="private_games" title={`Jeux privés (${privates.length})`}>
                    <TabRow className="g-0" data-aos="zoom-in" data-aos-delay="200">
                        {privates.map(game => (
                            <GameColumn sm={6} md={6} lg={3} className="col-6 text-center align-self-center" key={game.game_id}>
                                <GameContainer isselected={selected.includes(game.game_id)} game_id={game.game_id} hidden={game.hidden} />
                            </GameColumn>
                        ))}
                    </TabRow>
                </Tab>

                <Tab eventKey="selected_games" title={`Jeux sélectionnés (${selected.length})`}>
                    <TabRow className="g-0" data-aos="zoom-in" data-aos-delay="200">
                        {library.filter(game => selected.includes(game.game_id)).map(game => (
                            <GameColumn sm={6} md={6} lg={3} className="col-6 text-center align-self-center" key={game.game_id}>
                                <GameContainer isselected={selected.includes(game.game_id)} game_id={game.game_id} hidden={game.hidden} />
                            </GameColumn>
                        ))}
                    </TabRow>
                </Tab>

            </StyledTabs>
        </Col>
    )
};