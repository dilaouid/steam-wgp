import { useNavigate } from "@tanstack/react-router";
import { SteamderCard } from "@features/molecules/player/SteamderCard";
import { Button } from "@/components/ui/button";
import { ICompletedSteamder, ICurrentSteamder } from "@core/types/Player";
import { GamepadIcon } from "lucide-react";

export const SteamderList = ({
  current,
  completed,
}: {
  current: ICurrentSteamder | null;
  completed: ICompletedSteamder[] | null;
}) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Steamders</h2>
        <Button
          onClick={() => navigate({ to: "/players" })}
          variant="outline"
          size="sm"
        >
          ← Retour à la liste des joueurs
        </Button>
      </div>

      {!current && !completed?.length ? (
        <div className="text-center py-8 text-gray-500">
          <GamepadIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Aucune steamder trouvée</p>
        </div>
      ) : (
        <>
          {current && <SteamderCard steamder={current} type="active" />}
          {completed?.map((s) => (
            <SteamderCard key={s.steamder_id} steamder={s} type="completed" />
          ))}
        </>
      )}
    </div>
  );
};
