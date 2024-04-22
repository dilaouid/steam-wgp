import styled from "styled-components";
import { BsHeartFill } from "react-icons/bs";
import { IoMdSad } from "react-icons/io";

import { TiltableImage } from "../../../atoms/steamder/TiltableImage";

import { useSteamderStore } from "../../../../store/steamderStore";
import { useBtnGameStore } from "../../../../store/hoverBtnGameStore";

const ImageContainer = styled.div`
    perspective: 1000px;
    display: inline-block;
    position: relative;
`;

const StyledHeart = styled(BsHeartFill)`
    z-index: 4;
    position: absolute;
    font-size: 124px;
    margin: 109px;
    margin-top: 169px;
    margin-left: 108px;
    opacity: .6;

    // play an animation, appears in fade in
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    animation: fadeIn 0.5s;
`;

const StyledSad = styled(IoMdSad)`
    z-index: 4;
    position: absolute;
    font-size: 124px;
    margin: 109px;
    margin-top: 169px;
    margin-left: 108px;
    opacity: .6;

    // play an animation, appears in fade in
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    animation: fadeIn 0.5s;
`;

const RedCover = styled.div`
    border-radius: 40px;
    z-index: 3;
    position: absolute;
    height: 475.5px;
    background: #ff0000;
    width: 317px;
    opacity: .6;

    // play an animation, appears in fade in
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: .6; }
    }

    animation: fadeIn 0.5s;
`;

const GrayCover = styled.div`
    border-radius: 40px;
    z-index: 3;
    position: absolute;
    height: 475.5px;
    background: #393939;
    width: 317px;
    opacity: .6;

    // play an animation, appears in fade in
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: .6; }
    }

    animation: fadeIn 0.5s;
`;

export const CoverImageSwipe = () => {
    const { hoverLike, hoverPass } = useBtnGameStore();
    const { steamder } = useSteamderStore();

    const imageUrl = steamder?.display_all_games ?
        `https://steamcdn-a.akamaihd.net/steam/apps/${steamder?.all_games[0]}/library_600x900.jpg` :
        `https://steamcdn-a.akamaihd.net/steam/apps/${steamder?.common_games[0]}/library_600x900.jpg`;
    
    return (
        <ImageContainer>

            { hoverLike && <>
                <StyledHeart />
                <RedCover />
            </> }

            { hoverPass && <>
                <StyledSad />
                <GrayCover />
            </> }

            <TiltableImage hovered={hoverLike || hoverPass} alt={`Game cover for ${steamder?.common_games[0]}`} src={imageUrl} />
        </ImageContainer>
    )
};