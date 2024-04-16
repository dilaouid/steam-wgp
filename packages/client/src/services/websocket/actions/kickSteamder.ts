import { useAuthStore } from "../../../store/authStore";
import { useSteamderStore } from "../../../store/steamderStore";
import { drawToast } from "../../../utils/drawToast"
import { calculateCommonGames } from "../../../utils/calculateCommonGames";
import { calculateAllGames } from "../../../utils/calculateAllGames";

export const kickSteamder = (playerId: string)  => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    const { setUser, user } = useAuthStore.getState();

    if (!user || !steamder) 
        return null;

    if (playerId === user.id) {
        drawToast('you_have_been_kicked', 'warn');
        setSteamder(null);
        setUser({ ...user, waitlist: null });
        window.location.href = '/steamders';
    } else {
        if (steamder.admin_id !== user.id)
            drawToast('player_has_been_kicked', 'warn');
        const common_games = calculateCommonGames({ ...steamder, players: steamder.players.filter(player => player.player_id !== playerId) }) || [];
        const all_games = calculateAllGames(steamder.players);
        setSteamder({
            ...steamder,
            players: steamder.players.filter(player => player.player_id !== playerId),
            common_games: common_games.length,
            all_games
        });
    }
}