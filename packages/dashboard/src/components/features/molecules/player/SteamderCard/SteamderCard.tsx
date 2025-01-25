import { Avatar } from "@features/atoms/player/Avatar";
import { cn } from "@core/utils";
import { TSteamderCardProps } from "./SteamderCard.props";
import { ICompletedSteamder, ICurrentSteamder } from "@core/types/Player";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, GamepadIcon, Library, Lock, Users, Zap } from "lucide-react";
import { Stat } from "@features/atoms/player/Stat";
import { Badge } from "@/components/ui/badge";

export const SteamderCard = ({ steamder, type }: TSteamderCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate({ to: `/steamder/${steamder.steamder_id}` })}
      className={cn(
        "relative overflow-hidden",
        "rounded-xl border border-white/10",
        "bg-gradient-to-br cursor-pointer transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10",
        type === "active"
          ? "from-blue-600/20 to-indigo-900/20"
          : "from-emerald-600/20 to-emerald-900/20"
      )}
    >
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="relative p-4 flex gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {type === "active" ? (
              <Zap className="w-5 h-5 text-blue-400" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            )}
            <h3 className="text-lg font-bold text-white">{steamder.name}</h3>
            {steamder.private && (
              <Badge variant="secondary" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Privé
              </Badge>
            )}
          </div>

          {type === "active" ? (
            <div className="grid grid-cols-2 gap-2">
              <Stat
                icon={Users}
                value={(steamder as ICurrentSteamder).common_games}
                label={(steamder as ICurrentSteamder).common_games > 1 ? "jeux en commun" : "jeu en commun"}
              />
              <Stat
                icon={Library}
                value={(steamder as ICurrentSteamder).all_games}
                label="total"
              />
            </div>
          ) : (
            <Stat
              icon={GamepadIcon}
              value={(steamder as ICompletedSteamder).total_games}
              label={(steamder as ICompletedSteamder).total_games > 1 ? "jeux" : "jeu"}
            />
          )}
        </div>

        {type === "completed" && steamder.selected && (
          <div className="absolute right-4 h-full top-0 w-32 flex items-center">
            <div className="w-full aspect-[600/900] relative overflow-hidden rounded-lg">
              <img
                src={`https://steamcdn-a.akamaihd.net/steam/apps/${steamder.selected}/library_600x900.jpg`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/30 to-transparent animate-pulse" />
              <div className="absolute inset-0 ring-1 ring-white/20 group-hover:ring-white/40 transition-all" />
            </div>
          </div>
        )}
      </div>

      <div className="px-4 pb-4 flex items-center gap-2">
        {steamder.members.map((member) => (
          <Avatar
            key={member.id}
            hash={member.avatar_hash}
            isSteamderAdmin={member.id === steamder.admin_id}
            size="sm"
            className="hover:z-10 hover:scale-110 transition-all"
          />
        ))}
      </div>
    </div>
  );
};
