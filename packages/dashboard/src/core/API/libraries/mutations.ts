import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@core/queryClient";
import { libraryQueries } from "./queries";

export const useLibraryMutations = (playerId: number) => {
    return {
        updateLibrary: useMutation({
            mutationFn: libraryQueries.update,
            onSuccess: async () => {
                queryClient.invalidateQueries({ queryKey: ['player', playerId] })
            }
        })
    };
};