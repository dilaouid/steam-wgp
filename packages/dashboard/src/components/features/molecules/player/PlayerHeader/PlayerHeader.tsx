import { ExternalLink } from "lucide-react";
import { format } from "date-fns";

import { Avatar } from "@features/atoms/player/Avatar";
import { IPlayerDetails } from "@core/types/Player";

import { Badge } from "@/components/ui/badge";
import { EditProfileDialog } from "@/components/features/organisms/player/EditProfileDialog/EditProfileDialog";

export const PlayerHeader = ({ player }: { player: IPlayerDetails }) => (
  <div className="flex items-start gap-4">
    <Avatar hash={player.avatar_hash} isSiteAdmin={player.isAdmin} size="xl" />
    <div className="flex-1 space-y-3">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{player.username}</h1>
        <a href={player.profileurl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        </a>
        {player.is_deleted && (
          <Badge variant="destructive" className="ml-auto">
            {player.delete_date ? "En cours de suppression" : "Supprimé"}
          </Badge>
        )}
      </div>

      <div className="pt-1">
        <EditProfileDialog player={player} />
      </div>

      {player.delete_date && (
        <p className="text-sm text-red-500 mt-1">
          Suppression effective le{" "}
          {format(
            new Date(
              new Date(player.delete_date).getTime() + 48 * 60 * 60 * 1000
            ),
            "dd/MM/yyyy HH:mm"
          )}
        </p>
      )}
    </div>
  </div>
);
