import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '@core/services/API/global/auth/checkAuth';

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: checkAuth,
    select: (data) => data.data
  });
};