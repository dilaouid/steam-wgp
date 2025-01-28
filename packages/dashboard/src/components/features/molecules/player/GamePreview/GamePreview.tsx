import { useEffect, useState } from "react";
import { EmptyState } from "@features/atoms/player/EmptyState";

export const GamePreview = ({ gameId }: { gameId: string | number }) => {
  const [primaryImgError, setPrimaryImgError] = useState(false);
  const [secondaryImgError, setSecondaryImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPrimaryImgError(false);
    setSecondaryImgError(false);
    if (gameId) setIsLoading(true);
  }, [gameId]);

  if (!gameId) {
    return <EmptyState />;
  }

  if (primaryImgError && secondaryImgError) {
    return <EmptyState hasError />;
  }

  return (
    <div className="aspect-[600/900] rounded-lg overflow-hidden bg-gray-900">
      {isLoading && <div className="w-full h-full animate-pulse bg-gray-800" />}
      {!primaryImgError ? (
        <img
          src={`https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/library_600x900.jpg`}
          onError={() => setPrimaryImgError(true)}
          onLoad={() => setIsLoading(false)}
          className={`w-full h-full object-cover transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}
          alt={`Game cover for ${gameId}`}
        />
      ) : (
        <img
          src={`https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/header.jpg`}
          className="w-full h-full object-cover"
          onError={() => setSecondaryImgError(true)}
          onLoad={() => setIsLoading(false)}
          alt={`Game cover for ${gameId}`}
        />
      )}
    </div>
  );
};
