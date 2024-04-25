import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSteamder } from "../services/api/waitlists/create";

export const useCreateSteamder = () => {
    const queryClient = useQueryClient();

    return useMutation({ mutationFn: createSteamder, mutationKey: ['create', 'steamder'], onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["steamders"] })
        queryClient.invalidateQueries({ queryKey: ["steamders", "count"] })
    } })
};