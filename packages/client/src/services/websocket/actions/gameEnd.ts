import { useAuthStore } from "../../../store/authStore";
import { useSteamderStore } from "../../../store/steamderStore";

export const gameEnd = (choosed_game: number) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    const { user, setUser } = useAuthStore.getState();

    if (!user || !steamder) return;
    setUser({ ...user, waitlist: null });
    setSteamder({ ...steamder, complete: true, choosed_game });
}