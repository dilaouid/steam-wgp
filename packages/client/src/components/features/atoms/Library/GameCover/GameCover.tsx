import { useState } from "react";

import { useIsMutating } from "@tanstack/react-query";

import { useLibraryStore } from "@store/libraryStore";
import { Cover, GoodSizedSkeleton } from "./GameCover.styled";

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