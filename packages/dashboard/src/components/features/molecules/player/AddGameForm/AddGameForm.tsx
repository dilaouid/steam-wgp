import { useState } from "react";

import { GamePreview } from "@features/molecules/player/GamePreview";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AddGameForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (gameId: number) => void;
  onCancel: () => void;
}) => {
  const [gameId, setGameId] = useState<string>("");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>ID du jeu Steam</Label>
            <Input
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Ex: 730"
            />
          </div>
          <p className="text-sm text-gray-500">
            Entrez l'ID Steam du jeu à ajouter
          </p>
        </div>

        <GamePreview gameId={gameId} />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSubmit(Number(gameId))} disabled={!gameId}>
          Ajouter
        </Button>
      </div>
    </div>
  );
};
