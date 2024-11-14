import { useState } from "react";

import styled from "styled-components";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { ImageContainer } from "@atoms/steamder/ImageContainer";
import { TiltableImage } from "@atoms/steamder/TiltableImage";

import { useSteamderStore } from "@store/steamderStore";

import ConfettiExplosion from 'react-confetti-explosion';

const StyledCol = styled(Col)`
    margin-top: 36px;
    text-align: center;
`;

const StyledChoosen = styled.p`
    overflow: hidden;
    z-index: 3;
    width: 100%;
    font-size: 97px;
    font-family: Abel, sans-serif;
    text-shadow:
        0px 0px 11px var(--bs-body-bg),
        0px 0px 15px,
        0px 0px 20px var(--bs-secondary-bg);
    position: absolute;
    margin-top: 287px;
    transform: scale(0);
    @keyframes fadeInAndZoom {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeOutAndDezoom {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    animation: fadeInAndZoom 3s 4s forwards, fadeOutAndDezoom 3s 7s forwards;
`;

export const WinnerColumn = () => {
    const [confetti, setConfetti] = useState(false);

    const { t } = useTranslation('pages/steamder', { keyPrefix: 'result' });
    const { steamder } = useSteamderStore();
    if (!steamder) return null;

    setTimeout(() => setConfetti(true), 4000);

    return (
        <StyledCol sm={12}>
            <StyledChoosen className="user-select-none text-center text-warning">{ t('its_decided') }</StyledChoosen> 
            <ImageContainer>
                { confetti && <ConfettiExplosion force={.6} duration={5500} particleCount={360} width={1000} style={{ position: 'absolute', margin: 50+'%' }} /> }
                <TiltableImage gameId={steamder.choosed_game || 0} hovered={false} alt={`Game cover for ${steamder?.choosed_game}`} zoomAppears={true} />
            </ImageContainer>
        </StyledCol>
    )
};