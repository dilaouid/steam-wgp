import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '@core/API/auth/checkAuth';

import type { UseQueryResult } from '@tanstack/react-query';
import type { IAuthConfig, IUser } from '@core/types';

interface IAuthResponse {
  data: IUser;
}

export const useCheckAuth = (config: IAuthConfig): UseQueryResult<IUser, Error> => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      try {
        const response = await checkAuth(config);
        return response;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    select: (response) => response.data
  });
};