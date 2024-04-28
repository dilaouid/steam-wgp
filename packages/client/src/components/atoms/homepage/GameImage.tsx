import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Link } from "@tanstack/react-router";
import Skeleton from "react-loading-skeleton";

const StyledImage = styled.img<{ $golden?: boolean }>`
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  @keyframes rgb-neon-glow {
    0% { box-shadow: 0 0 10px #ff0000; }
    16% { box-shadow: 0 0 10px #ff7700; }
    33% { box-shadow: 0 0 10px #ffff00; }
    50% { box-shadow: 0 0 10px #00ff00; }
    66% { box-shadow: 0 0 10px #0000ff; }
    83% { box-shadow: 0 0 10px #8b00ff; }
    100% { box-shadow: 0 0 10px #ff0000; }
  };
  animation: ${props => props.$golden ? 'rgb-neon-glow 4s infinite linear' : ''};
  ${props => props.$golden ? 'filter: grayscale(0);' : 'filter: grayscale(.7);'}
  opacity: ${props => props.$golden ? 1 : .5};
  transition: 1s;
  &:hover {
    opacity: .8;
  }
`;

interface ImageContainerProps {
  game_id: number;
  golden?: boolean;
}

export const GameImage: React.FC<ImageContainerProps> = ({ game_id, golden }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [ imageUrl, setImageUrl ] = useState(`https://steamcdn-a.akamaihd.net/steam/apps/${game_id}/library_600x900.jpg`);

  useEffect(() => {
    setImageUrl(`https://steamcdn-a.akamaihd.net/steam/apps/${game_id}/library_600x900.jpg`);
  }, [game_id]);

  const handleImageError = () => {
    setImageUrl(`https://cdn.akamai.steamstatic.com/steam/apps/${game_id}/header.jpg`);
  };

  return (
    <>
      { game_id == 0 && <Skeleton width={170} height={250} baseColor="#343a40" highlightColor="#495057" style={{ borderRadius: 15+'px'}} /> }
      { game_id != 0 && <Link to={`https://store.steampowered.com/app/${game_id}`} target="_blank">
          <StyledImage onError={handleImageError} ref={imgRef} src={imageUrl} alt={`Game cover for ${game_id}`} $golden={golden} />
        </Link>
      }
    </>
  );
};