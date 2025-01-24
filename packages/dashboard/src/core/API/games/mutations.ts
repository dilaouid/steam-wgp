import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@core/queryClient";
import { IUseGameMutationsReturn } from "./types";
import { gameQueries } from "./queries";

export const useGameMutations = (): IUseGameMutationsReturn => {
    return {
        createGame: useMutation({
            mutationFn: gameQueries.create,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['games'] })
            }
        }),

        updateGame: useMutation({
            mutationFn: gameQueries.update,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['games'] })
            }
        })
    };
};