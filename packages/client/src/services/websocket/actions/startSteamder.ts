import { Navigate } from "@tanstack/react-router";
import { drawToast } from "../../../utils/drawToast";
import { useSteamderStore } from "../../../store/steamderStore";
import { queryClient } from "../../../main";

export const startSteamder = (id?: string) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    if (!steamder) return;
    setSteamder({ ...steamder, started: true });

    queryClient.invalidateQueries({ queryKey: ["steamders"] });
    if (id)
        Navigate({ to: `/steamder/${id}` });
    drawToast('room_begins', "success");
};