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
        })
    };
};