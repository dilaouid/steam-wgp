import { useMutation } from "@tanstack/react-query";
import { joinSteamder } from "@core/services/API/steamders/join";

export const useJoinSteamder = (steamderId: string) => {
    return useMutation({ mutationFn: () => joinSteamder(steamderId), mutationKey: ['steamder', steamderId], retry: false });
};