import { useAuthStore } from "../../../store/authStore";
import { useSteamderStore } from "../../../store/steamderStore";
import { calculateCommonGames } from "../../../utils/calculateCommonGames";

/**
 * Join the current user to the steamder room
 * 
 * @returns void
 */
export const joinSteamder = () => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    const { user } = useAuthStore.getState();
    if (!user || !steamder) return;

    const isPlayerAlreadyInRoom = steamder.players.some(current => current.player_id === user.id);
    if (isPlayerAlreadyInRoom)
        return;

    const common = calculateCommonGames({ ...steamder, players: [...steamder.players, user] }) || [];
    setSteamder({ 
        ...steamder, 
        players: [...steamder.players, user],
        commonGames: common
    });
}