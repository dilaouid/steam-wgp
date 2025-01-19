import { router, queryClient } from "@core";
import { useSteamderStore } from "@store";
import { useAuthStore } from "@steamwgp/shared-ui";

import { drawToast } from "@core/utils"

export const endSteamder = () => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    const { user, setUser } = useAuthStore.getState();

    if (!user || !steamder) return;
    setSteamder(null);
    setUser({ ...user, steamder: null });
    queryClient.invalidateQueries({ queryKey: ["steamders"] });
    // check if the user is in the steamder room page
    if (router.matchRoute('/steamder'))
        router.navigate({ to: '/', replace: true, resetScroll: true });
    drawToast('admin_closed_room', 'info');
}