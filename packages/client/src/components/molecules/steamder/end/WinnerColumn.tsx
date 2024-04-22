import styled from "styled-components";
import { Col } from "react-bootstrap";
import { ImageContainer } from "../../../atoms/steamder/ImageContainer";
import { TiltableImage } from "../../../atoms/steamder/TiltableImage";
import { useSteamderStore } from "../../../../store/steamderStore";

const StyledCol = styled(Col)`
    margin-top: 36px;
    text-align: center;
`;

export const WinnerColumn = () => {
    const { steamder } = useSteamderStore();
    if (!steamder) return null;

    const imageUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${steamder?.choosed_game}/library_600x900.jpg`;

    return (
        <StyledCol sm={12}>
            <ImageContainer>
                <TiltableImage src={imageUrl} hovered={false} alt={`Game cover for ${steamder?.choosed_game}`} zoomAppears={true} />
            </ImageContainer>
        </StyledCol>
    )
};