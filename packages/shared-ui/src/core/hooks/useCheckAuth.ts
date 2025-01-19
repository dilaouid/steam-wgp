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
      const response = await checkAuth(config);
      return response.data;
    },
    select: (data: IAuthResponse) => data.data
  });
};