import styled from "styled-components";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useLibraryStore } from "../../../store/libraryStore";
import { useTranslation } from "react-i18next";
import { EmptyTab } from "../../molecules/library/EmptyTab";
import { GameColumn } from "../../molecules/library/GameColumn";

const StyledTabs = styled(Tabs)`
    font-family: 'Archivo Narrow', sans-serif;
`;

const TabRow = styled(Row)`
    background: #060606c5;
    padding: 14px;
`;

export const RightColumnLibrary: React.FC = () => {
    const { t } = useTranslation('pages/library', { keyPrefix: 'right_column' });
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
                <Tab eventKey="all_games" title={t('tabs_title.all_games', { count: library.length })}>
                    <TabRow className="g-0">
                        {library.map(game => (
                            <GameColumn game={game} key={'all_' + game.game_id} />
                        ))}
                    </TabRow>
                </Tab>

                <Tab eventKey="public_games" title={t('tabs_title.public_games', { count: publics.length })}>
                    <TabRow className="g-0">

                        { publics.length === 0 && <EmptyTab>{t('no_public_games')}</EmptyTab> }

                        {publics.map(game => (
                            <GameColumn game={game} key={'public_' + game.game_id} />
                        ))}
                    </TabRow>
                </Tab>

                <Tab eventKey="private_games" title={t('tabs_title.private_games', { count: privates.length })}>
                    <TabRow className="g-0">

                        { privates.length === 0 && <EmptyTab>{t('no_private_games')}</EmptyTab> }

                        {privates.map(game => (
                            <GameColumn game={game} key={'private_' + game.game_id} />
                        ))}
                    </TabRow>
                </Tab>

                <Tab eventKey="selected_games" title={t('tabs_title.selected_games', { count: selected.length })}>
                    <TabRow className="g-0">

                        { selected.length === 0 && <EmptyTab>{t('no_selected_games')}</EmptyTab> }

                        {library.filter(game => selected.includes(game.game_id)).map(game => (
                            <GameColumn game={game} key={'selected_' + game.game_id} />
                        ))}
                    </TabRow>
                </Tab>

            </StyledTabs>
        </Col>
    )
};