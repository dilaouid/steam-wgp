import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";

import { useLibraryStore } from "../../../store/libraryStore";

import { Question } from "../../atoms/library/Question";
import { SelectedCount } from "../../atoms/library/SelectedCount";
import { SubmitSelectedButton } from "../../atoms/library/SubmitSelectedButton";

const StyledCol = styled(Col)`
    height: 50%;
    background: #060606c5;
    padding: 22px;
    border-radius: 27px;
`;

const ButtonCol = styled(Col)`
    margin-top: 4px;
`;

const StyledRow = styled(Row)`
    font-family: Abel, sans-serif;
`;

const StyledTitle = styled.h3`
    font-family: Agdasima, sans-serif;
`;

export const LeftColumnLibrary: React.FC = () => {
    const { t } = useTranslation('pages/library', { keyPrefix: 'left_column' });
    const { selected, library } = useLibraryStore();

    const getPublicGames = () => {
        return library.filter(game => !game.hidden && selected.includes(game.game_id));
    };

    const getPrivateGames = () => {
        return library.filter(game => game.hidden && selected.includes(game.game_id));
    };

    return (
        <StyledCol sm={12} lg={4} data-aos="fade-right" data-aos-duration="600">
            <StyledTitle className="text-info">{ t('your_library') }</StyledTitle>
            <p>Retrouvez votre bibliothèque de jeux multijoueurs <strong>Steam</strong> ici.</p>
            <Question>{ t('not_finding_a_game') }</Question>
            <p><Trans t={t} i18nKey="not_multiplayer" components={{ 1: <strong /> }} /></p>
            <p><Trans t={t} i18nKey="select_games" components={{ 1: <strong className="text-info" /> }} /></p>
            
            <Question>{ t('how_to') }</Question>
            <p>{ t('click') }</p>
            <p><Trans t={t} i18nKey="explanations" components={{ 1: <strong className="text-info" /> }} /></p>
            <hr />
            <StyledRow className="text-center" data-aos="zoom-out" data-aos-duration="450" data-aos-delay="300">
                <SelectedCount count={getPublicGames().length} type="public" />
                <SelectedCount count={getPrivateGames().length} type="private" />
                <ButtonCol className="col-12">
                    <SubmitSelectedButton count={selected.length} />
                </ButtonCol>
            </StyledRow>
        </StyledCol>
    );
};