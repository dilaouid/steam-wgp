import styled from "styled-components";
import { Row } from "react-bootstrap";

import { IPlayer } from "../../../../../core/types/ISteamder";
import { PlayerNotHavingGame } from "components/features/atoms/Steamder/end/PlayerNotHavingGame/PlayerNotHavingGame";

const StyledRow = styled(Row)`
    background: #060606ab;
    height: 102px;
    padding-top: 10px;
`;

interface playersWithoutGameProps {
    playersWithoutGame: IPlayer[];
}

export const PlayersNotHavingGame: React.FC<playersWithoutGameProps> = ({ playersWithoutGame }) => {
    return (
        <StyledRow className="justify-content-center">
            { playersWithoutGame.map(player => (
                <PlayerNotHavingGame key={player.player_id} player={player} />
            )) }
        </StyledRow>
    );
};