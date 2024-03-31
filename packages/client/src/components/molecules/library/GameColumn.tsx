import styled from "styled-components";
import { Col } from "react-bootstrap";
import { GameContainer } from "./GameContainer";

const StyledCol = styled(Col)`
    margin-bottom: 20px;
`;

interface GameColumnProps {
    game: {
        game_id: string;
        hidden: boolean;
    };
}

export const GameColumn: React.FC<GameColumnProps> = ({ game }) => {
    return (
    <StyledCol sm={6} md={6} lg={3} className="col-6 text-center align-self-center">
        <GameContainer game_id={game.game_id} hidden={game.hidden} />
    </StyledCol>);
};