import { Trans, useTranslation } from "react-i18next";

import { useLibraryStore } from "@store/libraryStore";

import { Question } from "@features/atoms/Library/Question/Question";
import { SelectedCount } from "@features/atoms/Library/SelectedCount/SelectedCount";
import { SubmitSelectedButton } from "@features/atoms/Library/SubmitSelectedButton/SubmitSelectedButton";

import { StyledTitle, ButtonCol, Col, Row } from "./Informations.styled";

export const Informations: React.FC = () => {
    const { t } = useTranslation('pages/library', { keyPrefix: 'left_column' });
    const { selected, library } = useLibraryStore();

    const getPublicGames = () => {
        return library.filter(game => !game.hidden && selected.includes(game.game_id));
    };

    const getPrivateGames = () => {
        return library.filter(game => game.hidden && selected.includes(game.game_id));
    };

    return (
        <Col sm={12} lg={4}>
            <StyledTitle className="text-info">{ t('your_library') }</StyledTitle>
            <p><Trans t={t} i18nKey="find_your_library" components={{ 1: <strong /> }} /></p>
            <Question>{ t('not_finding_a_game') }</Question>
            <p><Trans t={t} i18nKey="not_multiplayer" components={{ 1: <strong /> }} /></p>
            <p><Trans t={t} i18nKey="select_games" components={{ 1: <strong className="text-info" /> }} /></p>
            
            <Question>{ t('how_to') }</Question>
            <p>{ t('click') }</p>
            <p><Trans t={t} i18nKey="explanations" components={{ 1: <strong className="text-info" /> }} /></p>
            <hr />
            <Row className="text-center" data-aos="zoom-out" data-aos-duration="450">
                <SelectedCount count={getPublicGames().length} type="public" />
                <SelectedCount count={getPrivateGames().length} type="private" />
                <ButtonCol sm={12}>
                    <SubmitSelectedButton count={selected.length} />
                </ButtonCol>
            </Row>
        </Col>
    );
};