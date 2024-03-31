import styled, { css } from "styled-components";
import { BsShieldLockFill } from "react-icons/bs";
import { GameCover } from "../../atoms/library/GameCover";
import { useLibraryStore } from "../../../store/libraryStore";
import { useIsMutating } from "@tanstack/react-query";

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
    game_id: string;
    hidden: boolean;
}

export const GameContainer: React.FC<GameContainerProps> = ({ game_id, hidden }) => {
    const { selected } = useLibraryStore();
    const isMutating = useIsMutating({ mutationKey: ['update', 'library'] });

    return(
        <Container isselected={selected.includes(game_id)}>
            { !isMutating && hidden && <LockIcon /> }
            <GameCover game_id={game_id} hidden={hidden} />
        </Container>
    )
};