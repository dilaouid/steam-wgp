import { Trans, useTranslation } from "react-i18next";

import { IoIosClock } from "react-icons/io";
import Countdown, { zeroPad } from "react-countdown";

import { useSteamderStore } from "@store/steamderStore";

import { StyledContainer, StyledCountdownText, StyledTitle } from "./Header.styled";

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