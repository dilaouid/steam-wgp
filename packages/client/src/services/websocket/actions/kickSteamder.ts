import { router, queryClient } from "../../../main";
import { useAuthStore } from "@store/authStore";
import { useSteamderStore } from "@store/steamderStore";
import { drawToast } from "@utils/drawToast"
import { calculateCommonGames } from "@utils/calculateCommonGames";
import { calculateAllGames } from "@utils/calculateAllGames";

export const kickSteamder = (playerId: string)  => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    const { setUser, user } = useAuthStore.getState();

    if (!user || !steamder) 
        return null;

    if (playerId === user.id) {
        queryClient.invalidateQueries({ queryKey: ["steamders"] })
        router.navigate({ to: '/', resetScroll: true });
        setSteamder(null);
        setUser({ ...user, steamder: null });
        drawToast('you_have_been_kicked', 'warn');
    } else {
        if (steamder.admin_id !== user.id)
            drawToast('player_has_been_kicked', 'warn');
        const common_games = calculateCommonGames({ ...steamder, players: steamder.players.filter(player => player.player_id !== playerId) }) || [];
        const all_games = calculateAllGames(steamder.players);
        setSteamder({
            ...steamder,
            players: steamder.players.filter(player => player.player_id !== playerId),
            common_games,
            all_games,
            swiped_games: steamder.swiped_games || []
        });
    }
}