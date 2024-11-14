import styled from "styled-components";

import CoverImage from '@assets/images/steamderpage/cover.jpg';
import { GameWinRow } from "@organisms/steamder/end/GameWinRow";
import { HaventTheGame } from "@organisms/steamder/end/HaventTheGame";

import { useSteamderStore } from "@store/steamderStore";
import { useAuthStore } from "@store/authStore";

const StyledSection = styled.section`
    padding-top: 9px;
    padding-bottom: 27px;
    background-attachment: fixed;
    background-image: url(${CoverImage});
    background-size: cover;
    background-position: right;
    overflow-x: hidden;
`;

export const SteamderWinPage = () => {
    const { user } = useAuthStore();
    const { steamder } = useSteamderStore();
    let extraDisplay = false;

    if (steamder?.display_all_games) {
        const player = steamder?.players.find(player => player.player_id === user?.id);
        const userHaveTheGame = player?.games.includes(steamder?.choosed_game || 0);
        const playersWithoutGame = steamder?.players.filter(player => 
            player.player_id !== user?.id && !player.games.includes(steamder?.choosed_game || 0)
        ) || [];
        extraDisplay = !userHaveTheGame || playersWithoutGame?.length > 0
    }

    return (
        <StyledSection>
            <GameWinRow printShop={extraDisplay} />
            { extraDisplay && <HaventTheGame /> }
        </StyledSection>
    );
};