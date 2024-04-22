import styled from "styled-components";

import { TiltableImage } from "../../../atoms/steamder/TiltableImage";
import { SadIcon } from "../../../atoms/steamder/game/SadIcon";

import { useSteamderStore } from "../../../../store/steamderStore";
import { useBtnGameStore } from "../../../../store/hoverBtnGameStore";
import { GrayCover } from "../../../atoms/steamder/game/GrayCover";
import { HoverLike } from "./HoverLike";
import { HoverPass } from "./HoverPass";

const ImageContainer = styled.div`
    perspective: 1000px;
    display: inline-block;
    position: relative;
`;

export const CoverImageSwipe = () => {
    const { hoverLike, hoverPass } = useBtnGameStore();
    const { steamder } = useSteamderStore();

    const imageUrl = steamder?.display_all_games ?
        `https://steamcdn-a.akamaihd.net/steam/apps/${steamder?.all_games[0]}/library_600x900.jpg` :
        `https://steamcdn-a.akamaihd.net/steam/apps/${steamder?.common_games[0]}/library_600x900.jpg`;
    
    return (
        <ImageContainer>

            { hoverLike && <HoverLike /> }

            { hoverPass && <HoverPass /> }

            <TiltableImage hovered={hoverLike || hoverPass} alt={`Game cover for ${steamder?.common_games[0]}`} src={imageUrl} />
        </ImageContainer>
    )
};