import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@core/queryClient";
import { IUseGameMutationsReturn } from "./types";
import { gameQueries } from "./queries";

export const useGameMutations = (): IUseGameMutationsReturn => {
    return {
        createGame: useMutation({
            mutationFn: gameQueries.create,
            onSuccess: async () => {
                await Promise.all([
                    queryClient.invalidateQueries({ queryKey: ['games'] }),
                    queryClient.invalidateQueries({ queryKey: ['player'] })
                ]);
            }
        }),

        updateGame: useMutation({
            mutationFn: gameQueries.update,
            onSuccess: async () => {
                await Promise.all([
                    queryClient.invalidateQueries({ queryKey: ['games'] }),
                    queryClient.invalidateQueries({ queryKey: ['player'] })
                ]);
            }
        })
    };
};