import { AddGameForm } from "@features/molecules/player/AddGameForm";
import { useGameMutations } from "@core/API/games";
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
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { createGame } = useGameMutations();

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
            await createGame.mutateAsync({
              id: gameId,
              is_selectable: true,
            });
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
