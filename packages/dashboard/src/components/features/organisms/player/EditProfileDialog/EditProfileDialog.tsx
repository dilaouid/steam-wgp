import { useState } from "react";
import { IPlayerDetails } from "@core/types/Player";

import { EditProfileForm } from "@features/molecules/player/EditProfileForm";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

export const EditProfileDialog = ({ player }: { player: IPlayerDetails }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="w-4 h-4 mr-2" />
          Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le profil</DialogTitle>
          <DialogDescription>
            Modifier les informations du joueur
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm player={player} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
