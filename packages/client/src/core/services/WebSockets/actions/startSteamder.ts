import { Navigate } from "@tanstack/react-router";
import { drawToast } from "@core/utils/drawToast";
import { useSteamderStore } from "@store/steamderStore";

import { queryClient } from "@core";

export const startSteamder = (endTime: number, id?: string) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    if (!steamder) return;
    setSteamder({ ...steamder, started: true, endTime });

    queryClient.invalidateQueries({ queryKey: ["steamders"] });
    if (id)
        Navigate({ to: `/steamder/${id}` });
    drawToast('room_begins', "success");
};