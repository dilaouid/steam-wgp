import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kickSteamder } from "../services/api/waitlists/kick";

export const useKickSteamder = (steamderId: string, playerId: string) => {
    const queryClient = useQueryClient();

    return useMutation({ mutationFn: () => kickSteamder(steamderId, playerId), mutationKey: ['kick', 'steamder'], onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["steamders"] })
    } });
};