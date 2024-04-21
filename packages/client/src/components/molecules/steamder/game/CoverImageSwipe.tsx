import { useRef } from "react";

import styled from "styled-components";
import { BsHeartFill } from "react-icons/bs";
import { IoMdSad } from "react-icons/io";

import { useSteamderStore } from "../../../../store/steamderStore";
import { useBtnGameStore } from "../../../../store/hoverBtnGameStore";

const ImageContainer = styled.div`
    perspective: 1000px;
    display: inline-block;
    position: relative;
`;

const TiltableImage = styled.img<{ $hovered?: boolean }>`
    transition: transform 0.3s;
    transform-style: preserve-3d;
    width: 317px;
    border-radius: 40px;
    box-shadow: 0px 0px 17px 10px #ff9b3f45;
    filter: ${props => props.$hovered ? 'grayscale(1)' : 'grayscale(0)'};
    transition: filter 0.3s ease-in-out;
`;

const StyledHeart = styled(BsHeartFill)`
    z-index: 4;
    position: absolute;
    font-size: 124px;
    margin: 109px;
    margin-top: 169px;
    margin-left: 108px;
    opacity: 0.80;
    transition: opacity 0.3s ease-in-out;
`;

const StyledSad = styled(IoMdSad)`
    z-index: 4;
    position: absolute;
    font-size: 124px;
    margin: 109px;
    margin-top: 169px;
    margin-left: 108px;
    opacity: 0.80;
    transition: opacity 0.3s ease-in-out;
`;

const RedCover = styled.div`
    border-radius: 40px;
    z-index: 3;
    position: absolute;
    height: 475.5px;
    background: #ff0000;
    width: 317px;
    opacity: .6;
    transition: .5s;
`;

const GrayCover = styled.div`
    border-radius: 40px;
    z-index: 3;
    position: absolute;
    height: 475.5px;
    background: #393939;
    width: 317px;
    opacity: .6;
    transition: .5s;
`;

export const CoverImageSwipe = () => {
    const imgRef = useRef<HTMLImageElement>(null);
    const { hoverLike, hoverPass } = useBtnGameStore();
    const { steamder } = useSteamderStore();

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const img = imgRef.current;
        if (!img) return;
    
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const centerX = width / 2;
        const centerY = height / 2;
        const rotateX = (centerY - y) / 20;
        const rotateY = (x - centerX) / 20;
    
        img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        const img = imgRef.current;
        if (img) img.style.transform = '';
    };

    const imageUrl = steamder?.common_games?.[0]
        ? `https://steamcdn-a.akamaihd.net/steam/apps/${steamder.common_games[0]}/library_600x900.jpg`
        : undefined;
    
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

            <TiltableImage $hovered={hoverLike || hoverPass} alt={`Game cover for ${steamder?.common_games[0]}`} ref={imgRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} src={imageUrl} />
        </ImageContainer>
    )
};