import styled from "styled-components";

import { useSteamderStore } from "@store/steamderStore";

import { SwipedGame } from "components/features/atoms/Steamder/game/SwipedGame/SwipedGame";

const StyledBox = styled.div`
    overflow-y: scroll;
    height: 307px;
    margin: 12px;
    background: #080808ee;
    width: 80%;
    border-radius: 19px;
`;

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