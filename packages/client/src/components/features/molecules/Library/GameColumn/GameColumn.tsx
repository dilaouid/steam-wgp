import { GameContainer } from "../GameContainer";

import { GameColumnProps, StyledCol } from ".";

export const GameColumn: React.FC<GameColumnProps> = ({ game }) => {
    return (
    <StyledCol sm={6} md={6} lg={3} className="text-center align-self-center">
        <GameContainer game_id={game.game_id} hidden={game.hidden} />
    </StyledCol>);
};