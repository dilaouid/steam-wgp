import { OverlayTrigger } from "react-bootstrap";
import { IoGameController } from "react-icons/io5";
import { useTranslation } from "react-i18next";

import { LabelTooltip } from "@features/atoms/Steamder/LabelTooltip";
import { StyledText } from ".";

export const GamesInCommon: React.FC<{commonGames: number}> = ({ commonGames }) => {
    const { t } = useTranslation('pages/steamder', { keyPrefix: 'steamder.players' });

    return (
        <OverlayTrigger flip={true} placement="bottom" overlay={LabelTooltip(t('games_in_common', { count: commonGames }))}>
            <StyledText className={`lead text-center ${commonGames > 0 ? 'text-info' : 'text-danger'} user-select-none`}>
                <strong> { commonGames } </strong>
                <IoGameController />
            </StyledText>
        </OverlayTrigger>
    );
};