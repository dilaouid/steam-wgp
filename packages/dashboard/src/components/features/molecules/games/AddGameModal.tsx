import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGameModal } from "@/core/hooks/games/useGameModel";
import { cn } from "@/core/utils";
import { Gamepad2 } from "lucide-react";

export const AddGameModal = () => {
  const {
    gameId,
    setGameId,
    isSelectable,
    setIsSelectable,
    previewUrl,
    setPreviewUrl,
    handleSubmit,
    isLoading,
  } = useGameModal();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Ajouter un jeu
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Nouveau jeu</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="gameId">ID Steam</Label>
              <Input
                id="gameId"
                value={gameId}
                onChange={(e) => {
                  setGameId(e.target.value);
                  setPreviewUrl(
                    `https://steamcdn-a.akamaihd.net/steam/apps/${e.target.value}/library_600x900.jpg`
                  );
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="isSelectable">Multijoueur</Label>
              <Switch
                id="isSelectable"
                checked={isSelectable}
                onCheckedChange={setIsSelectable}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              {isLoading ? "Création..." : "Créer"}
            </button>
          </div>

          <div className="flex items-center justify-center">
            {gameId ? (
              <div className="relative aspect-[600/900] w-full">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded-lg object-cover w-full h-full"
                    onError={() => setPreviewUrl(null)}
                  />
                ) : (
                  <div className="h-full bg-gray-900 rounded-lg flex flex-col items-center justify-center space-y-2">
                    <Gamepad2 className="w-16 h-16 text-gray-600" />
                    <span className="text-gray-500">Image non disponible</span>
                    <span className="text-sm text-gray-600">
                      Steam ID: {gameId}
                    </span>
                  </div>
                )}
                <div
                  className={cn(
                    "absolute top-2 right-2",
                    "px-2 py-1 rounded-full",
                    "text-xs font-medium",
                    isSelectable
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  )}
                >
                  {isSelectable ? "Multijoueur" : "Solo"}
                </div>
              </div>
            ) : (
              <div className="aspect-[600/900] w-full bg-gray-900 rounded-lg flex flex-col items-center justify-center space-y-2">
                <Gamepad2 className="w-16 h-16 text-gray-600" />
                <span className="text-gray-500">Entrez un ID Steam</span>
                <span className="text-sm text-gray-600">
                  pour voir la prévisualisation
                </span>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
