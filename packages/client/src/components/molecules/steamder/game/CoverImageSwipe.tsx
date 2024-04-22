import { TiltableImage } from "../../../atoms/steamder/TiltableImage";

import { useSteamderStore } from "../../../../store/steamderStore";
import { useBtnGameStore } from "../../../../store/hoverBtnGameStore";
import { HoverLike } from "./HoverLike";
import { HoverPass } from "./HoverPass";
import { ImageContainer } from "../../../atoms/steamder/ImageContainer";

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