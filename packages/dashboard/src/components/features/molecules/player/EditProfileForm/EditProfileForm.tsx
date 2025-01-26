import { useState } from "react";

import { usePlayerMutations } from "@core/API/players";
import { IPlayerDetails } from "@core/types/Player";

import { AvatarPreview } from "@features/atoms/player/AvatarPreview";
import { FormInput } from "@ui/atoms/FormInput";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const EditProfileForm = ({
  player,
  onClose,
}: {
  player: IPlayerDetails;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    username: player.username,
    avatar_hash: player.avatar_hash,
    profileurl: player.profileurl,
    isAdmin: player.isAdmin,
  });

  const { updatePlayer } = usePlayerMutations();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <AvatarPreview hash={formData.avatar_hash} key={formData.avatar_hash}  />
      </div>

      <div className="grid gap-4">
        <FormInput
          label="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        <FormInput
          label="Avatar Hash"
          value={formData.avatar_hash}
          onChange={(e) =>
            setFormData({ ...formData, avatar_hash: e.target.value })
          }
        />

        <FormInput
          label="URL du profil Steam"
          value={formData.profileurl}
          onChange={(e) =>
            setFormData({ ...formData, profileurl: e.target.value })
          }
        />

        <div className="flex items-center justify-between">
          <Label>Administrateur</Label>
          <Switch
            checked={formData.isAdmin}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isAdmin: checked })
            }
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button
          disabled={updatePlayer.isPending}
          onClick={async () => {
            await updatePlayer.mutateAsync({
              id: player.id as number,
              ...formData,
            });
            onClose();
          }}
        >
          {updatePlayer.isPending ? "Chargement ..." : "Enregistrer les changements"}
        </Button>
      </DialogFooter>
    </div>
  );
};
