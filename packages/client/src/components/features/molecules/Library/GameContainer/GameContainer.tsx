import { GameCover } from "@features/atoms/Library/GameCover/GameCover";
import { useLibraryStore } from "@store/libraryStore";

import { GameHomepageContainer, GameContainerProps } from ".";

export const GameContainer: React.FC<GameContainerProps> = ({ id, hidden }) => {
    const { selected } = useLibraryStore();

    return(
        <GameHomepageContainer $selected={selected.includes(id)}>
            <GameCover game_id={id} hidden={hidden} />
        </GameHomepageContainer>
    )
};