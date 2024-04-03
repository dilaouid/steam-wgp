import styled from "styled-components";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { IoGameController } from "react-icons/io5";

const StyledText = styled.p`
    margin-top: 7px;
    font-size: 17px;
`;

const LabelTooltip = (message: number) => 
    <Tooltip id="common-games-tooltip">
        { message } jeux en communs
    </Tooltip>;

export const GamesInCommon: React.FC<{commonGames: number}> = ({ commonGames }) => {
    return (
        <OverlayTrigger placement="bottom" overlay={LabelTooltip(commonGames)}>
            <StyledText className={`lead text-center ${commonGames > 0 ? 'text-info' : 'text-danger'} user-select-none`}>
                <strong> { commonGames } </strong>
                <IoGameController />
            </StyledText>
        </OverlayTrigger>
    );
};