import styled, { css } from "styled-components";
import { BsShieldLockFill } from "react-icons/bs";
import { GameCover } from "../../atoms/library/GameCover";

const Container = styled.div<{ isselected: boolean }>`
    position: relative;
    display: inline-block;
    width: 70%;
    border-radius: 20px;
    &::before {
        content: "";
        position: absolute;
        top: -3px;
        right: -3px;
        bottom: -3px;
        left: -3px;
        border: 4px solid transparent;
        border-radius: 20px;
        z-index: 0;
        transition: border-color .4s;

        ${props => props.isselected && css`
            border-color: var(--bs-info);
        `}
    }
`;

const LockIcon = styled(BsShieldLockFill)`
    opacity: .5;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
    font-size: 5vw;
`;

interface GameContainerProps {
    isselected: boolean;
    game_id: string;
    hidden: boolean;
}

export const GameContainer: React.FC<GameContainerProps> = ({ isselected, game_id, hidden }) => {
    return(
        <Container isselected={isselected}>
            { hidden && <LockIcon /> }
            <GameCover game_id={game_id} hidden={hidden} />
        </Container>
    )
};