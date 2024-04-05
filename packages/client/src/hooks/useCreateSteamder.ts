import { useMutation } from "@tanstack/react-query";
import { createSteamder } from "../services/api/waitlists/create";

export const useCreateSteamder = () => {
    return useMutation({ mutationFn: createSteamder, mutationKey: ['create', 'steamder'] })
};