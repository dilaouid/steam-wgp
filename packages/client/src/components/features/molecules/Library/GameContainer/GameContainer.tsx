import { GameCover } from "@features/atoms/Library/GameCover/GameCover";
import { useLibraryStore } from "@store/libraryStore";
import { useIsMutating } from "@tanstack/react-query";

import { Container, LockIcon, GameContainerProps } from ".";

export const GameContainer: React.FC<GameContainerProps> = ({ game_id, hidden }) => {
    const { selected } = useLibraryStore();
    const isMutating = useIsMutating({ mutationKey: ['update', 'library'] });

    return(
        <Container $selected={selected.includes(game_id)}>
            { !isMutating && hidden && <LockIcon /> }
            <GameCover game_id={game_id} hidden={hidden} />
        </Container>
    )
};