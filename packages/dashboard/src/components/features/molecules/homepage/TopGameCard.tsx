import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@core/utils';

import { ITopGameProps } from './TopGameCard.props';

export const TopGameCard = ({ gameId, score, rank, totalSteamders }: ITopGameProps) => {
  const [imgError, setImgError] = useState(false);
  const percent = (score / totalSteamders) * 100;

  const imageUrl = imgError 
    ? `https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/header.jpg`
    : `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/library_600x900.jpg`;

  return (
    <a
      href={`https://store.steampowered.com/app/${gameId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative group",
        "rounded-xl overflow-hidden",
        "transform transition-all duration-500",
        "hover:scale-[1.02]",
        "shadow-lg hover:shadow-2xl",
        "hover:shadow-indigo-500/20",
        "bg-gradient-to-br from-gray-900 to-black"
      )}
    >
      <img
        src={imageUrl}
        onError={() => setImgError(true)}
        alt={`Top game ${rank}`}
        className="w-full h-[300px] object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-t from-black via-black/80 to-transparent",
        "opacity-80 group-hover:opacity-90",
        "transition-all duration-300"
      )} />

      <div className={cn(
        "absolute inset-0",
        "flex items-end",
        "p-6",
        "transition-all duration-300"
      )}>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-white">
                <span className="text-2xl font-bold">#{rank}</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-white/90 font-medium">{score}</span>
                <span className="text-white/70">sélections en match</span>
              </div>

              <div className="text-xs text-gray-300">
                <span className="font-medium">{percent.toFixed(2)}%</span>
                  <span> des sélections</span>
              </div>
            </div>
            <ExternalLink className="text-white/70 group-hover:text-white" size={20} />
          </div>
        </div>
      </div>

      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/0",
        "group-hover:from-indigo-500/0 group-hover:via-indigo-500/10 group-hover:to-indigo-500/0",
        "transition-all duration-500"
      )} />
    </a>
  );
};
