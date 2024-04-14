import { Navigate } from "@tanstack/react-router";
import { useAuthStore } from "../../../store/authStore";
import { useSteamderStore } from "../../../store/steamderStore";
import { drawToast } from "../../../utils/drawToast"

export const endSteamder = () => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    const { user, setUser } = useAuthStore.getState();

    if (!user || !steamder) return;
    setSteamder(null);
    setUser({ ...user, waitlist: null });
    // check if the user is in the steamder room page
    if (window.location.pathname.includes('/steamder/')) {
        Navigate({ to: '/' });
    }
    drawToast('admin_closed_room', 'info');
}