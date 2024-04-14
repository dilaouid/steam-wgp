import { Navigate } from "@tanstack/react-router";
import { drawToast } from "../../../utils/drawToast";
import { useSteamderStore } from "../../../store/steamderStore";

export const startSteamder = (id?: string) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    if (!steamder) return;
    setSteamder({ ...steamder, started: true });

    if (id)
        Navigate({ to: `/steamder/${id}` });
    drawToast('room_begins', "success");
};