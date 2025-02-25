import { useState } from "react";
import { cn } from "@core/utils";
import { Eye, EyeOff, Lock, MoreVertical, Trash2 } from "lucide-react";
import { IGameCardProps } from "./GameCard.props";
import { GameActionModal } from "../GameActionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGameMutations } from "@core/API/games";

export const GameCard = ({ gameId, hidden, onToggle }: IGameCardProps) => {
  const { updateGame } = useGameMutations();

  const [imgError, setImgError] = useState(false);
  const [showSoloModal, setShowSoloModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<boolean | null>(null);

  const handleGameAction = (isSelectable: boolean) => {
    setPendingAction(isSelectable);
    setShowSoloModal(true);
  };

  const handleDeleteGameAction = () => {
    setShowDeleteModal(true);
  };

  return (
    <div className="group relative">
      <button
        onClick={() => onToggle()}
        className={cn(
          "relative aspect-[600/900] w-full",
          "cursor-pointer",
          "rounded-lg overflow-hidden",
          "transform transition-all duration-300",
          "hover:scale-105",
          "ring-1 ring-white/10 hover:ring-2 hover:ring-indigo-500/50",
          hidden && "grayscale hover:grayscale-0"
        )}
      >
        {/* Images */}
        {!imgError ? (
          <img
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/library_600x900.jpg`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            alt=""
          />
        ) : (
          <img
            src={`https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/header.jpg`}
            className="w-full h-full object-cover"
            alt=""
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div
          className={cn(
            "absolute top-2 right-2",
            "w-8 h-8",
            "flex items-center justify-center",
            "rounded-full",
            "backdrop-blur-md",
            "transform transition-all",
            "group-hover:scale-110",
            hidden
              ? "bg-red-500/20 text-red-400"
              : "bg-emerald-500/20 text-emerald-400"
          )}
        >
          {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
        </div>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => handleGameAction(false)}
            className="text-red-500"
          >
            <Lock className="mr-2 h-4 w-4" />
            <span>Marquer comme solo</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleDeleteGameAction()}
            className="text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Supprimer de la bibliothèque</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <GameActionModal
        isOpen={showSoloModal}
        onClose={() => setShowSoloModal(false)}
        onConfirm={() => {
          updateGame.mutate({
            id: gameId,
            is_selectable: pendingAction!,
          });
          setShowSoloModal(false);
        }}
      >
        Marquer ce jeu comme 'Solo' va le retirer des bibliothèques de TOUS les
        joueurs et il ne sera plus disponible pour les Steamders. Êtes-vous sûr
        ?
      </GameActionModal>

      <GameActionModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          updateGame.mutate({
            id: gameId,
            is_selectable: pendingAction!,
          });
          setShowDeleteModal(false);
        }}
      >
        Vous vous apprêtez à supprimer ce jeu de la bibliothèque du joueur, ce qui pourra affecter sa Steamder actuelle s'il en a une. Êtes-vous sûr ?
      </GameActionModal>
    </div>
  );
};
