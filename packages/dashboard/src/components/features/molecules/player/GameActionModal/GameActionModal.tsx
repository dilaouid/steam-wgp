import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { IGameActionModalProps } from "./GameActionModal.props";

export const GameActionModal = ({
  isOpen,
  onClose,
  onConfirm,
}: Omit<IGameActionModalProps, "isSelectable">) => (
  <AlertDialog open={isOpen} onOpenChange={onClose}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-red-500">
          Action importante
        </AlertDialogTitle>
        <AlertDialogDescription>
          Marquer ce jeu comme 'Solo' va le retirer des bibliothèques de TOUS
          les joueurs et il ne sera plus disponible pour les Steamders.
          Êtes-vous sûr ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-600"
        >
          Confirmer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
