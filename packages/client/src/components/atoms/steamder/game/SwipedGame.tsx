import { useState } from "react";
import styled from "styled-components";
import { useSteamderStore } from "@store/steamderStore";
import { unswipeCard } from "@services/websocket/send";

const StyledLikedGames = styled.img`
    object-fit: cover;
    width: 60px;
    height: 60px;
    margin: 9px;
    opacity: 0.60;
    filter: grayscale(100%);
    transition: .3s;
    cursor: pointer;
  
    &:hover {
        opacity: .3;
        transform: scale(.9);
    }
`;

interface SwipedGameProps {
    game_id: number;
}

export const SwipedGame: React.FC<SwipedGameProps> = ({ game_id }) => {
    const [ imageUrl, setImageUrl ] = useState(`https://steamcdn-a.akamaihd.net/steam/apps/${game_id}/library_600x900.jpg`);
    const { steamder, setSteamder } = useSteamderStore();

    const handleImageError = () => {
        setImageUrl(`https://cdn.akamai.steamstatic.com/steam/apps/${game_id}/header.jpg`);
    };

    const unsSwipeGame = () => {
        if (!steamder) return;
        if (!steamder.swiped_games.includes(game_id)) return;
        
        unswipeCard(game_id);
        const property = steamder.display_all_games ? 'all_games' : 'common_games';

        const newSwipedGames = steamder.swiped_games.filter((game) => game !== game_id);

        setSteamder({ ...steamder, 
            // remove game_id from swiped_games array
            swiped_games: newSwipedGames,
            [property]: [ ...steamder[property], game_id ]});
    };

    return (
        <StyledLikedGames onError={handleImageError} className="user-select-none" onClick={() => unsSwipeGame()} src={imageUrl} alt={`Game cover for liked game: ${game_id}`} />
    );

};