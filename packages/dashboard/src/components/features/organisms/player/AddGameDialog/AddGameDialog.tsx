import { AddGameForm } from "@features/molecules/player/AddGameForm";
import { useLibraryMutations } from "@core/API/libraries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const AddGameDialog = ({
  isOpen,
  onClose,
  player_id,
}: {
  isOpen: boolean;
  onClose: () => void;
  player_id: number;
}) => {
  const { add } = useLibraryMutations(player_id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un jeu</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau jeu à la bibliothèque du joueur
          </DialogDescription>
        </DialogHeader>

        <AddGameForm
          onSubmit={async (gameId) => {
            await add.mutateAsync({
              game_id: gameId,
              hidden: true,
              player_id
            });
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
