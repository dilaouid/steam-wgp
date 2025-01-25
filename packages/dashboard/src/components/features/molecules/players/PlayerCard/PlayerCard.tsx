import { Link } from "@tanstack/react-router";
import { Activity, ChevronRight, Crown } from "lucide-react";

import { cn } from "@core/utils";

import { PlayerStats } from "@features/atoms/players/PlayerStats";
import { Badge } from "@/components/ui/badge";

import { IPlayerCardProps } from "./PlayerCard.props";

export const PlayerCard = ({
  id,
  username,
  avatar_hash,
  stats,
}: IPlayerCardProps) => {
  const hasActiveSteamder = stats.has_active_steamder;
  const isAdmin = stats.is_admin;

  
  return (
    <Link to={`/player/${id}`}>
      <div
        className={cn(
          "group relative p-4 rounded-xl",
          "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
          "border border-gray-200 dark:border-gray-700",
          "hover:shadow-lg transition-all duration-300",
          hasActiveSteamder && "ring-2 ring-emerald-500/50",
          isAdmin &&
            "bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900"
        )}
      >
        {hasActiveSteamder && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-emerald-500">En Steamder</Badge>
          </div>
        )}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={`https://avatars.akamai.steamstatic.com/${avatar_hash}_full.jpg`}
              className="w-16 h-16 rounded-full object-cover"
              alt={username}
            />
            {hasActiveSteamder && (
              <div className="absolute -top-1 -right-1">
                <Badge
                  variant="default"
                  className="w-4 h-4 p-0 flex items-center justify-center"
                >
                  <Activity className="w-3 h-3" />
                </Badge>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {username}
              </h3>
              {isAdmin && <Crown className="w-4 h-4 text-yellow-500" />}
            </div>
            <PlayerStats {...stats} />
          </div>

          {/* Arrow */}
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
        </div>
      </div>
    </Link>
  );
};
