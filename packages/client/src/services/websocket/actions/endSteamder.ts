import { router, queryClient } from "../../../main";
import { useAuthStore } from "../../../store/authStore";
import { useSteamderStore } from "../../../store/steamderStore";
import { drawToast } from "../../../utils/drawToast"

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