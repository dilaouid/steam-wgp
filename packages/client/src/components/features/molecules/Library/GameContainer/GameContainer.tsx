import { GameCover } from "@features/atoms/Library/GameCover/GameCover";
import { useLibraryStore } from "@store/libraryStore";

import { GameHomepageContainer, GameContainerProps } from ".";

export const GameContainer: React.FC<GameContainerProps> = ({ game_id, hidden }) => {
    const { selected } = useLibraryStore();

    return(
        <GameHomepageContainer $selected={selected.includes(game_id)}>
            <GameCover game_id={game_id} hidden={hidden} />
        </GameHomepageContainer>
    )
};