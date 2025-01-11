import { useMutation } from '@tanstack/react-query';
import { getSteamder } from '@core/services/API/steamders/get';

export const useGetSteamder = (steamderId: string) => {
    return useMutation({ mutationFn: () => getSteamder(steamderId), mutationKey: ['steamder', steamderId], retry: false });
};