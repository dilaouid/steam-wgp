import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@core/queryClient";
import { playerQueries } from "./queries";

export const usePlayerMutations = () => {
    return {
        updatePlayer: useMutation({
            mutationFn: playerQueries.update,
            onSuccess: async () => {
                await Promise.all([
                    queryClient.invalidateQueries({ queryKey: ['player'] }),
                    queryClient.invalidateQueries({ queryKey: ['players'] })
                ]);
            }
        }),
        
        syncLibrary: useMutation({
            mutationFn: (id: string | number) => playerQueries.syncLibrary(id), // Accepter ID string ou number
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['player'] });
                await queryClient.invalidateQueries({ queryKey: ['players'] });
            }
        })
    };
};