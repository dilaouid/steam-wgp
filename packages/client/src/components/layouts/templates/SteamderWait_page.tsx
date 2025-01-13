import styled from "styled-components";

import CoverImage from '@assets/images/steamderpage/cover.jpg';
import { Header } from "@features/molecules/Steamder/WaitingList/Header/Header";
import { RoomPlayers } from "@features/molecules/Steamder/WaitingList/RoomPlayers";
import { Informations } from "@features/molecules/Steamder/WaitingList/Informations/Informations";

const StyledSection = styled.section`
    padding-top: 9px;
    padding-bottom: 27px;
    background-attachment: fixed;
    background-image: url(${CoverImage});
    background-size: cover;
    background-position: right;
    overflow-x: hidden;
`;

export const SteamderWaitPage = () => {
    return (
        <StyledSection>
            <Header />
            <RoomPlayers />
            <Informations />
        </StyledSection>
    );
};