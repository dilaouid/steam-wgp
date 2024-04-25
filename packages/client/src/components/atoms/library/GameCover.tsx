import { useState } from "react";

import styled from "styled-components";
import Skeleton from 'react-loading-skeleton';
import { useIsMutating } from "@tanstack/react-query";

import { useLibraryStore } from "../../../store/libraryStore";

const Cover = styled.img<{ $private: boolean, $isFallback: boolean }>`
    user-select: none;
    transition: .4s;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    position: relative;
    z-index: 1;
    filter: ${props => props.$private ? 'blur(0px) brightness(79%) contrast(113%) grayscale(100%)' : 'none'};
    opacity: ${props => props.$private ? '0.6' : '1'};
    object-fit: ${props => props.$isFallback ? 'cover' : 'contain'};
    object-position: ${props => props.$isFallback ? 'center' : 'top'};
    &:hover {
        opacity: .6;
        transform: scale(0.9);
    }
`;

const GoodSizedSkeleton = styled(Skeleton)`
    z-index: 1;
    line-height: 1.5;
`;

interface GameCoverProps {
    game_id: string;
    hidden: boolean;
}

export const GameCover: React.FC<GameCoverProps> = ({ game_id, hidden }) => {
    const { setSelected, selected } = useLibraryStore();
    const isMutating = useIsMutating({ mutationKey: ['update', 'library'] });
    const [ imageUrl, setImageUrl ] = useState(`https://steamcdn-a.akamaihd.net/steam/apps/${game_id}/library_600x900.jpg`);
    const [ isFallback, setIsFallback ] = useState(false);

    const handleClick = () => {
        setSelected(selected.includes(game_id) ? selected.filter(id => id !== game_id) : [...selected, game_id]);
    };

    const handleImageError = () => {
        setImageUrl(`https://cdn.akamai.steamstatic.com/steam/apps/${game_id}/header.jpg`);
        setIsFallback(true);
    };

    if (isMutating)
        return <GoodSizedSkeleton enableAnimation height={215} highlightColor="#444" baseColor="#333" borderRadius={20+'px'} inline={false} />;    

    return <Cover onClick={handleClick} $isFallback={isFallback} $private={hidden} src={imageUrl} alt={`Game cover for ${game_id}`} onError={handleImageError} />;
};