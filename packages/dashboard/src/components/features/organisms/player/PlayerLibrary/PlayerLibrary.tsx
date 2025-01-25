import { useState } from "react";
import { GameCard } from "@/components/features/molecules/player/GameCard";
import { Button } from "@/components/ui/button";
import { IPlayerDetails } from "@/core/types/Player";
import { useMutation } from "@tanstack/react-query";
import { Library } from "lucide-react";

export const PlayerLibrary = ({
  library,
}: {
  library: IPlayerDetails["library"];
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
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8">
      {" "}
      <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 scrollbar-hide">
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
      {hasChanges && (
        <div className="sticky bottom-0 py-4 bg-gradient-to-t from-white dark:from-gray-900">
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
