import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@core/queryClient";
import { libraryQueries } from "./queries";

export const useLibraryMutations = (playerId: number) => {
    return {
        update: useMutation({
            mutationFn: libraryQueries.update,
            onSuccess: async () => {
                queryClient.invalidateQueries({ queryKey: ['player', playerId] })
            }
        }),

        add: useMutation({
            mutationFn: libraryQueries.add,
            onSuccess: async () => {
                await Promise.all([
                    queryClient.invalidateQueries({ queryKey: ['games'] }),
                    queryClient.invalidateQueries({ queryKey: ['player', playerId] })
                ]);
            }
        })

    };
};