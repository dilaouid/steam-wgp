import { useEffect, useRef, useState } from "react";

import Skeleton from "react-loading-skeleton";
import { StyledImage, ImageContainerProps } from ".";

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
      { game_id != 0 && 
      <a 
        href={`https://store.steampowered.com/app/${game_id}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
          <StyledImage onError={handleImageError} ref={imgRef} src={imageUrl} alt={`Game cover for ${game_id}`} $golden={golden} />
      </a>
      }
    </>
  );
};