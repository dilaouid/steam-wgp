import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '@core/services/api/global/auth/authApi';

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: checkAuth,
    select: (data) => data.data
  });
};