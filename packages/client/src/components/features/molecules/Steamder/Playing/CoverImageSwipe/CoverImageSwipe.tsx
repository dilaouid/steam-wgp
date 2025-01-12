import { TiltableImage } from "components/features/atoms/Steamder/TiltableImage/TiltableImage";

import { useSteamderStore } from "@store/steamderStore";
import { useBtnGameStore } from "@store/hoverBtnGameStore";
import { HoverLike } from "../HoverLike/HoverLike";
import { HoverPass } from "../HoverPass/HoverPass";
import { ImageContainer } from "components/features/atoms/Steamder/ImageContainer/ImageContainer";

export const CoverImageSwipe = () => {
    const { hoverLike, hoverPass } = useBtnGameStore();
    const { steamder } = useSteamderStore();

    const gameId = steamder?.display_all_games ? steamder?.all_games[0] : steamder?.common_games[0];

    return (
        <ImageContainer>
            { hoverLike && <HoverLike /> }

            { hoverPass && <HoverPass /> }

            <TiltableImage gameId={gameId || 0} hovered={hoverLike || hoverPass} alt={`Game cover for ${steamder?.common_games[0]}`} />
        </ImageContainer>
    )
};