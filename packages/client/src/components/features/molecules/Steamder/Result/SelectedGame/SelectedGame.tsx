import { useState } from "react";

import { useTranslation } from "react-i18next";

import { ImageContainer, TiltableImage } from "@features/atoms/Steamder";
import { useSteamderStore } from "@store/steamderStore";

import ConfettiExplosion from 'react-confetti-explosion';

import { Col, Choosen } from "./SelectedGame.styled";

export const SelectedGame = () => {
    const [confetti, setConfetti] = useState(false);

    const { t } = useTranslation('pages/steamder', { keyPrefix: 'result' });
    const { steamder } = useSteamderStore();
    if (!steamder) return null;

    setTimeout(() => setConfetti(true), 4000);

    return (
        <Col sm={12}>
            <Choosen className="user-select-none text-center text-warning">{ t('its_decided') }</Choosen> 
            <ImageContainer>
                { confetti && <ConfettiExplosion force={.6} duration={5500} particleCount={360} width={1000} style={{ position: 'absolute', margin: 50+'%' }} /> }
                <TiltableImage gameId={steamder.choosed_game || 0} hovered={false} alt={`Game cover for ${steamder?.choosed_game}`} zoomAppears={true} />
            </ImageContainer>
        </Col>
    )
};