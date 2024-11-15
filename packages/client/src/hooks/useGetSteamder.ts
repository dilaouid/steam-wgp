import { useMutation } from '@tanstack/react-query';
import { getSteamder } from '@services/api/steamders/get';

export const useGetSteamder = (steamderId: string) => {
    return useMutation({ mutationFn: () => getSteamder(steamderId), mutationKey: ['steamder', steamderId], retry: false });
};