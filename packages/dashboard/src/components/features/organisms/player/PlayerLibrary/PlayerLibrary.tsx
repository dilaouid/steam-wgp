import { useState } from "react";

import { Library, Loader2, Plus, Save } from "lucide-react";

import { IPlayerDetails } from "@core/types/Player";

import { Button } from "@/components/ui/button";

import { GameCard } from "@features/molecules/player/GameCard";
import { Badge } from "@/components/ui/badge";
import { useLibraryMutations } from "@/core/API/libraries";

export const PlayerLibrary = ({
  library,
  player,
}: {
  library: IPlayerDetails["library"];
  player: IPlayerDetails;
}) => {
  const [changes, setChanges] = useState<number[]>([]);

  const { updateLibrary } = useLibraryMutations(player.id as number);

  const toggleGame = (gameId: number) => {
    setChanges((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId);
      }
      return [...prev, gameId];
    });
  };

  if (!library.length) {
    return (
      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8 text-center">
        <Library className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-400">Bibliothèque vide</h3>
        <p className="text-gray-500 mt-2 mb-4">
          Synchronisez la bibliothèque <b>Steam</b> du joueur pour voir ses jeux
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-white/90">
            Bibliothèque de{" "}
            <span className="text-indigo-400">{player.username}</span>
          </h2>
          <Badge variant="secondary" className="text-sm">
            {library.length} jeu{library.length > 1 ? "x" : ""}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={async () => {
              await updateLibrary.mutateAsync({
                id: player.id as number,
                games: changes,
              });
              setChanges([]);
            }}
      
            disabled={!changes.length || updateLibrary.isPending}
            variant="outline"
            size="sm"
          >
            {updateLibrary.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mise à jour...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={() => {
              /* TODO: Open add game modal */
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un jeu
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-2">
            {" "}
            {library.map(({ game_id, hidden }) => (
              <GameCard
                key={game_id}
                gameId={game_id}
                hidden={changes.includes(game_id) ? !hidden : hidden}
                onToggle={() => toggleGame(game_id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};