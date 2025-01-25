import { useMutation } from "@tanstack/react-query";

import { IPlayerDetails } from "@core/types/Player";

import { SyncButton } from "@features/atoms/player/SyncButton";
import { PlayerHeader } from "@features/molecules/player/PlayerHeader";

export const PlayerProfile = ({ player }: { player: IPlayerDetails }) => {
  const sync = useMutation({
    mutationFn: async () => {
      // Implementation sync Steam Library (TODO)
    },
  });

  return (
    <div className="space-y-4">
      <PlayerHeader player={player} />
      <SyncButton onSync={() => sync.mutate()} isLoading={sync.isPending} />
    </div>
  );
};
