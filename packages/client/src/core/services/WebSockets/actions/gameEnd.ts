import { useAuthStore, useSteamderStore } from "@store";

export const gameEnd = (choosed_game: number) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    const { user, setUser } = useAuthStore.getState();

    if (!user || !steamder) return;
    setUser({ ...user, steamder: null });
    setSteamder({ ...steamder, complete: true, choosed_game });
}