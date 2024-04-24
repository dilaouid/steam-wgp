import { useMutation } from '@tanstack/react-query';
import { getSteamder } from '../services/api/waitlists/get';

export const useGetSteamder = (steamderId: string) => {
    return useMutation({ mutationFn: () => getSteamder(steamderId), mutationKey: ['steamder', steamderId], retry: false });
};