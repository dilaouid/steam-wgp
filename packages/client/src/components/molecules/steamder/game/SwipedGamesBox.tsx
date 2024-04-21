import styled from "styled-components";

import { useSteamderStore } from "../../../../store/steamderStore";

import { unswipeCard } from "../../../../services/websocket/send";

const StyledBox = styled.div`
    overflow-y: scroll;
    height: 307px;
    margin: 12px;
    background: #080808ee;
    width: 80%;
    border-radius: 19px;
`;

const StyledLikedGames = styled.img`
    object-fit: cover;
    width: 60px;
    height: 60px;
    margin: 9px;
    opacity: 0.60;
    filter: grayscale(100%);
    transition: .3s;
    cursor: pointer;
  
    &:hover {
        opacity: .3;
        transform: scale(.9);
    }
`;

export const SwipedGamesBox = () => {
    const { steamder, setSteamder } = useSteamderStore();

    const unsSwipeGame = (game_id: number) => {
        if (!steamder) return;
        if (!steamder.swiped_games.includes(game_id)) return;

        unswipeCard(game_id);
        if (steamder.display_all_games)
            setSteamder({ ...steamder, swiped_games: steamder.swiped_games.filter((game) => game !== game_id), all_games: [...steamder.all_games, game_id] });
        else
            setSteamder({ ...steamder, swiped_games: steamder.swiped_games.filter((game) => game !== game_id), common_games: [...steamder.common_games, game_id] });
    };

    return (
        <StyledBox>
            { steamder?.swiped_games?.map((game, index) => (
                <StyledLikedGames onClick={() => unsSwipeGame(game)} key={index} src={`https://steamcdn-a.akamaihd.net/steam/apps/${game}/library_600x900.jpg`} alt={`Game cover for liked game: ${game}`} />
            )) }
        </StyledBox>
    )
};