import { useSteamderStore } from "../../../store/steamderStore";

export const switchDisplayGames = (display_all_games: boolean) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    if (!steamder) return;

    setSteamder({ ...steamder, display_all_games });
};