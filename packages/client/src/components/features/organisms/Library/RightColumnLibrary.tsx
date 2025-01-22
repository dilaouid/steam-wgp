import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import { useLibraryStore } from "@store/libraryStore";

import { queryClient } from "@core";

import { EmptyTab } from "@features/molecules/Library/EmptyTab/EmptyTab";
import { GameColumn } from "@features/molecules/Library/GameColumn/GameColumn";
import { SkeletonGameLoad } from "@features/molecules/Library/SkeletonGameLoad/SkeletonGameLoad";

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
    const state = queryClient.getQueryState(['library', 'get'])

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
                        { state?.status == 'success' && library.map(game => (
                            <GameColumn game={game} key={'all_' + game.id} />
                        )) }
                        { (state?.status == 'pending' || state?.status == 'error') && Array.from({length: 10}, (_, i) => <SkeletonGameLoad key={i} /> ) }
                    </TabRow>
                </Tab>

                <Tab eventKey="public_games" title={t('tabs_title.public_games', { count: publics.length })}>
                    <TabRow className="g-0">

                        { state?.status == 'success' && publics.length === 0 && <EmptyTab>{t('no_public_games')}</EmptyTab> }

                        { state?.status == 'success' && publics.map(game => (
                            <GameColumn game={game} key={'public_' + game.id} />
                        )) }
                        
                        { (state?.status == 'pending' || state?.status == 'error') && Array.from({length: 10}, (_, i) => <SkeletonGameLoad key={i} /> ) }
                    </TabRow>
                </Tab>

                <Tab eventKey="private_games" title={t('tabs_title.private_games', { count: privates.length })}>
                    <TabRow className="g-0">

                        { state?.status == 'success' && privates.length === 0 && <EmptyTab>{t('no_private_games')}</EmptyTab> }

                        { state?.status == 'success' && privates.map(game => (
                            <GameColumn game={game} key={'private_' + game.id} />
                        )) }

                        { (state?.status == 'pending' || state?.status == 'error') && Array.from({length: 10}, (_, i) => <SkeletonGameLoad key={i} /> ) }
                    </TabRow>
                </Tab>

                <Tab eventKey="selected_games" title={t('tabs_title.selected_games', { count: selected.length })}>
                    <TabRow className="g-0">

                        { state?.status == 'success' && selected.length === 0 && <EmptyTab>{t('no_selected_games')}</EmptyTab> }

                        { state?.status == 'success' && library.filter(game => selected.includes(game.id)).map(game => (
                            <GameColumn game={game} key={'selected_' + game.id} />
                        )) }

                        { (state?.status == 'pending' || state?.status == 'error') && Array.from({length: 10}, (_, i) => <SkeletonGameLoad key={i} /> ) }
                    </TabRow>
                </Tab>

            </StyledTabs>
        </Col>
    )
};