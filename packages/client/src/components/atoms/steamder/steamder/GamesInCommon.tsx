import styled from "styled-components";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { IoGameController } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const StyledText = styled.p`
    margin-top: 7px;
    font-size: 17px;
`;

const LabelTooltip = (message: string) => 
    <Tooltip id="common-games-tooltip">
        { message }
    </Tooltip>;

export const GamesInCommon: React.FC<{commonGames: number}> = ({ commonGames }) => {
    const { t } = useTranslation('pages/steamder', { keyPrefix: 'steamder.players' });

    return (
        <OverlayTrigger placement="bottom" overlay={LabelTooltip(t('games_in_common', { count: commonGames }))}>
            <StyledText className={`lead text-center ${commonGames > 0 ? 'text-info' : 'text-danger'} user-select-none`}>
                <strong> { commonGames } </strong>
                <IoGameController />
            </StyledText>
        </OverlayTrigger>
    );
};