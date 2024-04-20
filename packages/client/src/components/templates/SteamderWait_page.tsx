import styled from "styled-components";

import CoverImage from '../../assets/images/steamderpage/cover.jpg';
import { Header } from "../molecules/steamder/Header";
import { RoomPlayers } from "../molecules/steamder/RoomPlayers";
import { RoomInformations } from "../molecules/steamder/RoomInformations";
import Countdown, { zeroPad } from "react-countdown";

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
            <Countdown date={Date.now() + 500000} daysInHours={true} renderer={({ minutes, seconds }) => 
                <span>
                    { zeroPad(minutes) }:{ zeroPad(seconds) }
                </span>
            } />
            <Header />
            <RoomPlayers />
            <RoomInformations />
        </StyledSection>
    );
};