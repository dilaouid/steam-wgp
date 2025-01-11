import { useSteamderStore } from "@store/steamderStore";

import { SwipedGame } from "@features/atoms/Steamder/game/SwipedGame/SwipedGame";
import { StyledBox } from "./SwipedGamesBox.styled";

export const SwipedGamesBox = () => {
    const { steamder } = useSteamderStore();

    return (
        <StyledBox>
            { steamder?.swiped_games?.map((gameId) => (
                <SwipedGame game_id={gameId} key={gameId} />
            )) }
        </StyledBox>
    )
};