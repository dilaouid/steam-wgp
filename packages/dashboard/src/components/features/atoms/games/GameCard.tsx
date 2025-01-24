import { useState } from "react";
import { LockOpenIcon, Lock, Gamepad2, ExternalLink, Copy } from "lucide-react";

import { cn } from "@core/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

import { IGameCardProps } from "./GameCard.props";
import { useToast } from "@/hooks/use-toast";

export const GameCard = ({
  id,
  isSelectable,
  onToggle,
  isLoading,
}: IGameCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { toast } = useToast();


  const copyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id.toString());
    toast({
      description: "ID copié dans le presse-papier",
      className: "bg-emerald-500 text-white",
    });  
  };

  const openStore = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://store.steampowered.com/app/${id}`, "_blank");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="relative aspect-[600/900] cursor-pointer group">
          <div
            className={cn(
              "relative aspect-[600/900]",
              "bg-gradient-to-br from-gray-900 to-black",
              "rounded-xl overflow-hidden",
              "transition-all duration-300 hover:scale-[1.02]",
              isSelectable
                ? "ring-2 ring-emerald-500/50"
                : "ring-2 ring-red-500/50 opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
            )}
          >
            <div className="absolute left-0 top-2 z-10 flex items-center" onMouseLeave={() => setShowActions(false)}>
              <div
                className={cn(
                  "rounded-r-lg px-2 py-1",
                  "text-xs font-medium",
                  "bg-gray-800/80 text-gray-400",
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  "flex items-center gap-2",
                  showActions && "rounded-r-none"
                )}
                onMouseEnter={() => setShowActions(true)}
              >
                #{id}
              </div>

              <div
                className={cn(
                  "bg-gray-800/80 h-[26px] rounded-r-lg",
                  "flex items-center gap-2 px-2",
                  "transition-all",
                  showActions
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                )}
                onMouseLeave={() => setShowActions(false)}
              >
                <button
                  onClick={copyId}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  title="Copier l'ID"
                >
                  <Copy size={14} />
                </button>
                <div className="w-px h-3 bg-gray-600" />
                <button
                  onClick={openStore}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  title="Voir sur Steam"
                >
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>

            <div
              className={cn(
                "absolute top-2 right-2 z-10",
                "px-2 py-1 rounded-full",
                "text-xs font-medium",
                isSelectable
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
              )}
            >
              {isSelectable ? "Multijoueur" : "Solo"}
            </div>

            {!isSelectable && (
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/50 to-transparent" />
            )}

            {imgError ? (
              <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto" />
                  <span className="text-gray-500 block">
                    Image non disponible
                  </span>
                  <span className="text-sm text-gray-600 block">
                    Steam ID: {id}
                  </span>
                </div>
              </div>
            ) : (
              <img
                src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/library_600x900.jpg`}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover opacity-90 group-hover:opacity-100"
                alt={`Steam game ${id}`}
              />
            )}

            <div
              className={cn(
                "absolute inset-0",
                "flex items-center justify-center",
                "backdrop-blur-sm",
                "opacity-0 hover:opacity-100 transition-all",
                "text-white gap-2",
                isSelectable ? "bg-black/50" : "bg-red-950/50"
              )}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-t-white border-white/30 rounded-full animate-spin" />
              ) : (
                <>
                  {isSelectable ? <Lock /> : <LockOpenIcon />}
                  <span>{isSelectable ? "Désactiver" : "Activer"}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer le changement</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir {isSelectable ? "désactiver" : "activer"}{" "}
            le mode multijoueur pour ce jeu ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onToggle} disabled={isLoading}>
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-t-white border-white/30 rounded-full animate-spin" />
            ) : (
              "Confirmer"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
