import { queryClient } from "../../../main";
import { useSteamderStore } from "@store/steamderStore";

export const switchDisplayGames = (display_all_games: boolean) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    if (!steamder) return;

    queryClient.invalidateQueries({ queryKey: ["steamders"] });
    setSteamder({ ...steamder, display_all_games });
};