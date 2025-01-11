import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveSteamder } from "@core/services/api/steamders/leave";

export const useLeaveSteamder = () => {
    const queryClient = useQueryClient();

    return useMutation({ mutationFn: leaveSteamder, mutationKey: ['leave', 'steamder'], onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["steamders"] })
        queryClient.invalidateQueries({ queryKey: ["steamders", "count"] })
    } });
};