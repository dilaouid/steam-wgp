import styled from "styled-components";

import CoverImage from '../../assets/images/steamderpage/cover.jpg';
import { Header } from "../molecules/steamder/game/Header";
import { GameRow } from "../organisms/steamder/game/GameRow";

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
    return (
        <StyledSection>
            <Header />
            <GameRow />
        </StyledSection>
    );
};