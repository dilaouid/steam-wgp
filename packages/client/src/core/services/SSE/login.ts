import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookieValue } from '@core/utils/cookies';

import type { ISSEData } from '@core/types/ISSEData';
import { BASE_URL } from '@core/environment';

const useSSEQuery = () => {
  // State to check if the SSE is complete and update the UI accordingly
  const [isComplete, setIsComplete] = useState(false);

  // Query client to update the query data and manipulate the cache of the query
  const queryClient = useQueryClient();
  const token = getCookieValue('token');
  const url = `${BASE_URL}/players/library-checker?token=${token}`;

  // Initialising the query with an empty array (used for the cache)
  const { data } = useQuery<ISSEData[]>({
    queryKey: ['login_sse'],
    queryFn: () => new Promise<ISSEData[]>(resolve => resolve([])),
    enabled: false // disable automatic execution, we will handle the execution manually
  });

  useEffect(() => {
    if (!token) return; // If the token is not present, do not start the SSE: it means the user is not logged in

    // Create a new EventSource to listen to the SSE
    const eventSource = new EventSource(url, {
      withCredentials: true // maintain the session cookie
    });

    // Receive the data from the SSE and update the cache (the data here are the library check results)
    eventSource.onmessage = (event) => {
      // Parse the data from the event (the data is a stringified JSON)
      const newData: ISSEData = JSON.parse(event.data);

      // each time we receive a new data, we update the cache under the key 'login_sse', each time we go to a new step in the library check, we print the new data
      queryClient.setQueryData(['login_sse'], (prevData: ISSEData[] | undefined) => [...(prevData || []), newData]);
      if (newData.complete) {
        eventSource.close(); // close the connection when the library check is complete
        setIsComplete(true);
      }
    };

    return () => {
      // Close the connection when the component is unmounted
      eventSource.close();
    };
  }, [ queryClient, token, url ]);

  return { data: data || [], isComplete };
};

export default useSSEQuery;
