import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Library } from "lucide-react";

import { IPlayerDetails } from "@core/types/Player";

import { Button } from "@/components/ui/button";

import { GameCard } from "@features/molecules/player/GameCard";
import { Badge } from "@/components/ui/badge";

export const PlayerLibrary = ({
  library,
  player,
}: {
  library: IPlayerDetails["library"];
  player: IPlayerDetails;
}) => {
  const [changes, setChanges] = useState<Record<number, boolean>>({});

  const hasChanges = Object.keys(changes).length > 0;

  const updateLibrary = useMutation({
    mutationFn: async (changes: Record<number, boolean>) => {
      console.log(changes);
    },
  });

  const toggleGame = (gameId: number, hidden: boolean) => {
    setChanges((prev) => {
      const newChanges = { ...prev };
      const currentValue = newChanges[gameId];

      if (currentValue === undefined) {
        newChanges[gameId] = !hidden;
      } else {
        delete newChanges[gameId];
      }

      return newChanges;
    });
  };

  if (!library.length) {
    return (
      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8 text-center">
        <Library className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-400">Bibliothèque vide</h3>
        <p className="text-gray-500 mt-2 mb-4">
          Synchronisez la bibliothèque <b>Steam</b> du joueur pour voir vos jeux
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-white/90">
          Bibliothèque de{" "}
          <span className="text-indigo-400">{player.username}</span>
        </h2>
        <Badge variant="secondary" className="text-sm">
          {library.length} jeu{library.length > 1 ? "x" : ""}
        </Badge>
      </div>
      <div className="relative">
        <div
          className="h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-2">
            {" "}
            {library.map(({ game_id, hidden }) => (
              <GameCard
                key={game_id}
                gameId={game_id}
                hidden={changes[game_id] ?? hidden}
                onToggle={() => toggleGame(game_id, hidden)}
              />
            ))}
          </div>
        </div>
      </div>
      {hasChanges && (
        <div className="sticky bottom-0 pt-4">
          <Button
            onClick={() => updateLibrary.mutate(changes)}
            disabled={updateLibrary.isPending}
            className="w-full"
          >
            Appliquer les modifications
          </Button>
        </div>
      )}
    </div>
  );
};
