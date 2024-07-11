import { Navigate } from "@tanstack/react-router";
import { drawToast } from "../../../utils/drawToast";
import { useSteamderStore } from "../../../store/steamderStore";
import { queryClient } from "../../../main";
import { updateFavicon } from "../../../utils/updateFavicon";
import { showNotification } from "../../../utils/newNotification";

export const startSteamder = (endTime: number, id?: string) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    if (!steamder) return;
    setSteamder({ ...steamder, started: true, endTime });
    updateFavicon(true);
    showNotification("Steamder begins", { body: "The steamder has started" });
    queryClient.invalidateQueries({ queryKey: ["steamders"] });
    if (id)
        Navigate({ to: `/steamder/${id}` });
    drawToast('room_begins', "success");
};