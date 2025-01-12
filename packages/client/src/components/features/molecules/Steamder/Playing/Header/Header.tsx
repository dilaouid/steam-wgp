import styled from "styled-components";
import { Container } from "react-bootstrap";

import { Trans, useTranslation } from "react-i18next";

import { IoIosClock } from "react-icons/io";
import Countdown, { zeroPad } from "react-countdown";

import { useSteamderStore } from "@store/steamderStore";

const StyledContainer = styled(Container)`
    background: #000000cc;
    margin-top: 21px;
`;

const StyledTitle = styled.h3`
    height: 76.5938px;
    padding-top: 8px;
    font-family: Abel, sans-serif;
    margin-bottom: -7px;
`;

const StyledCountdownText = styled.p`
    margin-top: 18px;
    color: #8dd1f1;
    padding-bottom: 23px;
`;

export const Header = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "game" });
    const { steamder } = useSteamderStore();

    return(
        <StyledContainer>
            <StyledTitle className="display-5 text-center text-warning">{
                t('header')
            }</StyledTitle>
            <p className="font-monospace text-center">
                <Trans t={t} i18nKey="content" components={{ 1: <strong /> }} />
            </p>
            <StyledCountdownText className="lead fw-bold text-center">{ t('countdown') } : <Countdown date={new Date(steamder?.endTime || 0)} renderer={
                ({ minutes, seconds }) => 
                    <span>
                        { zeroPad(minutes) }:{ zeroPad(seconds) }
                    </span>
                } /> <IoIosClock />
            </StyledCountdownText>
        </StyledContainer>
    );
};