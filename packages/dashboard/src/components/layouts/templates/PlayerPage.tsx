import { PlayerDetailsSkeleton } from "@/components/features/organisms/player/PlayerDetailsSkeleton";
import { PlayerLibrary } from "@/components/features/organisms/player/PlayerLibrary";
import { PlayerProfile } from "@/components/features/organisms/player/PlayerProfile";
import { SteamderList } from "@/components/features/organisms/player/SteamderList";
import { usePlayer } from "@/core/hooks/players/usePlayer";

export const PlayerPage = ({ playerId }: { playerId: number }) => {
  const { data, isLoading } = usePlayer(playerId);

  if (isLoading) return <PlayerDetailsSkeleton />;
  if (!data) return <div>Joueur non trouvé</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <PlayerProfile player={data} />
          <SteamderList
            current={data.current_steamder}
            completed={data.completed_steamders}
          />
        </div>

        {/* Library section - 2 columns */}
        <div className="lg:col-span-2">
          <PlayerLibrary library={data.library} player={data} />
        </div>
      </div>
    </div>
  );
};
