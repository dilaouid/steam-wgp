import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePlayerMutations } from "@core/API/players/mutations";
import { IPlayerDetails } from "@core/types/Player";
import { SyncButton } from "@features/atoms/player/SyncButton";
import { PlayerHeader } from "@features/molecules/player/PlayerHeader";

export const PlayerProfile = ({ player }: { player: IPlayerDetails }) => {
  const { syncLibrary } = usePlayerMutations();
  const { toast } = useToast();
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSync = () => {
    setSyncStatus("loading");
    syncLibrary.mutate(player.id, {
      onSuccess: () => {
        setSyncStatus("success");
        toast({
          title: "Bibliothèque synchronisée",
          description: "La bibliothèque Steam a été synchronisée avec succès.",
          variant: "default",
        });

        // Revenir à idle après 2 secondes pour l'effet visuel
        setTimeout(() => setSyncStatus("idle"), 2000);
      },
      onError: (error) => {
        setSyncStatus("error");

        // Personnaliser le message d'erreur en fonction du type d'erreur
        let description =
          "Une erreur s'est produite lors de la synchronisation.";
        if (error instanceof Error) {
          if (
            error.message === "steam_profile_private" ||
            error.message === "steam_library_private"
          ) {
            description =
              "Le profil Steam ou la bibliothèque de jeux est défini(e) comme privé(e).";
          } else if (error.message === "steam_library_not_accessible") {
            description =
              "La bibliothèque Steam n'est pas accessible pour ce joueur.";
          } else if (error.message === "steam_profile_not_found") {
            description = "Le profil Steam n'a pas été trouvé.";
          }
        }

        toast({
          title: "Échec de la synchronisation",
          description,
          variant: "destructive",
        });

        // Revenir à idle après 2 secondes
        setTimeout(() => setSyncStatus("idle"), 2000);
      },
    });
  };

  return (
    <div className="space-y-4">
      <PlayerHeader player={player} />
      <SyncButton
        onSync={handleSync}
        isLoading={syncLibrary.isPending}
        status={syncStatus}
      />
    </div>
  );
};
