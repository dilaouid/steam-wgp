import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookieValue } from '@utils/cookieUtils';
import { ISSEData } from '../../types/ISSEData';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useSSEQuery = () => {
  const [isComplete, setIsComplete] = useState(false);
  const queryClient = useQueryClient();
  const token = getCookieValue('token');
  const url = `${BASE_URL}/players/library-checker?token=${token}`;

  const { data } = useQuery<ISSEData[]>({
    queryKey: ['login_sse'],
    queryFn: () => new Promise<ISSEData[]>(resolve => resolve([])),
    enabled: false
  });

  useEffect(() => {
    if (!token) return;
    const eventSource = new EventSource(url, {
      withCredentials: true
    });

    eventSource.onmessage = (event) => {
      const newData: ISSEData = JSON.parse(event.data);
      queryClient.setQueryData(['login_sse'], (prevData: ISSEData[] | undefined) => [...(prevData || []), newData]);
      if (newData.complete) {
        eventSource.close();
        setIsComplete(true);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [ queryClient, token, url ]);

  return { data: data || [], isComplete };
};

export default useSSEQuery;
