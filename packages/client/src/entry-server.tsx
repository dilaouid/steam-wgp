import { renderToString } from 'react-dom/server';
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { AuthWrapper } from '@wrappers/AuthWrapper';
import { initializeRouter } from './router';

import 'aos/dist/aos.css';
import 'react-loading-skeleton/dist/skeleton.css'

export async function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        retry: false
      },
    },
  });

  const router = initializeRouter(url);

  await router.load();

  const appHtml = renderToString(
    <QueryClientProvider client={queryClient}>
        <AuthWrapper>
            <RouterProvider router={router} />
        </AuthWrapper>
    </QueryClientProvider>
  );

  const dehydratedState = dehydrate(queryClient);

  return { appHtml, dehydratedState };
}