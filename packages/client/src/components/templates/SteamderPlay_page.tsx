import styled from "styled-components";

import CoverImage from '@assets/images/steamderpage/cover.jpg';
import { Header } from "@molecules/steamder/game/Header";
import { GameRow } from "@organisms/steamder/game/GameRow";

import { useSteamderStore } from "@store/steamderStore";

const StyledSection = styled.section`
    padding-top: 9px;
    padding-bottom: 27px;
    background-attachment: fixed;
    background-image: url(${CoverImage});
    background-size: cover;
    background-position: right;
    overflow-x: hidden;
`;

export const SteamderPlayPage = () => {
    const { steamder, shuffleGames } = useSteamderStore();

    if (steamder)
        shuffleGames();

    return (
        <StyledSection>
            <Header />
            <GameRow />
        </StyledSection>
    );
};