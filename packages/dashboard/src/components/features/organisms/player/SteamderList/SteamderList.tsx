import { useNavigate } from "@tanstack/react-router";
import { SteamderCard } from "@features/molecules/player/SteamderCard";
import { Button } from "@/components/ui/button";
import { ICompletedSteamder, ICurrentSteamder } from "@core/types/Player";
import { GamepadIcon } from "lucide-react";
import { useState } from "react";

export const SteamderList = ({
  current,
  completed,
}: {
  current: ICurrentSteamder | null;
  completed: ICompletedSteamder[] | null;
}) => {
  const navigate = useNavigate();
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setShowTopShadow(target.scrollTop > 20);
    setShowBottomShadow(
      target.scrollHeight - target.scrollTop - target.clientHeight > 20
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-400 to-indigo-600">
            Steamders
          </h2>
          <p className="text-sm text-gray-400">
            {current ? "Une en cours et " : ""}{completed?.length || 0} terminée{completed && completed?.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: "/players" })}
          variant="outline"
          size="sm"
        >
          ← Retour à la liste
        </Button>
      </div>

      <div className="relative">
        {showTopShadow && (
          <div
            className="absolute top-0 inset-x-0 h-32 z-10 opacity-0"
            style={{
              background:
                "linear-gradient(to bottom, rgb(17 24 39), rgba(17, 24, 39, 0.95) 25%, rgba(17, 24, 39, 0.5) 50%, transparent)",
              animation:
                "fade-gradient 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          />
        )}

        <div
          className="h-[calc(70vh-20rem)] overflow-y-auto scrollbar-hide"
          onScroll={handleScroll}
        >
          {!current && !completed?.length ? (
            <div className="text-center py-8 text-gray-500">
              <GamepadIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aucune steamder trouvée</p>
            </div>
          ) : (
            <div className="space-y-4 px-2 py-4">
              {current && <SteamderCard steamder={current} type="active" />}
              {completed?.map((s) => (
                <SteamderCard
                  key={s.steamder_id}
                  steamder={s}
                  type="completed"
                />
              ))}
            </div>
          )}
        </div>

        {showBottomShadow && (
          <div
            className="absolute bottom-0 inset-x-0 h-32 z-10 opacity-0"
            style={{
              background:
                "linear-gradient(to top, rgb(17 24 39), rgba(17, 24, 39, 0.95) 25%, rgba(17, 24, 39, 0.5) 50%, transparent)",
              animation:
                "fade-gradient 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          />
        )}
      </div>
    </div>
  );
};
