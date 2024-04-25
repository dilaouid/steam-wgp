import styled from "styled-components";

import CoverImage from '../../assets/images/steamderpage/cover.jpg';
import { GameWinRow } from "../organisms/steamder/end/GameWinRow";

import { useSteamderStore } from "../../store/steamderStore";
import { HaventTheGame } from "../organisms/steamder/end/HaventTheGame";

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
    const { steamder } = useSteamderStore();
    return (
        <StyledSection>
            <GameWinRow />
            { steamder?.display_all_games && <HaventTheGame /> }
        </StyledSection>
    );
};