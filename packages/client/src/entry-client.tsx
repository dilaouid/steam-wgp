import { hydrateRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { initializeRouter } from './router';
import { AuthWrapper } from '@wrappers/AuthWrapper';

import 'aos/dist/aos.css';
import 'react-loading-skeleton/dist/skeleton.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      retry: false,
    },
  },
});

const dehydratedState = window.__REACT_QUERY_STATE__;
hydrate(queryClient, dehydratedState);

const router = initializeRouter();

hydrateRoot(
  document.getElementById('root')!,
  <QueryClientProvider client={queryClient}>
    <AuthWrapper>
        <RouterProvider router={router} />
    </AuthWrapper>
  </QueryClientProvider>
);