import { createRouter, createMemoryHistory, createBrowserHistory } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const router = createRouter({ routeTree })

export function initializeRouter(url?: string) {
  const history = typeof window === 'undefined'
    ? createMemoryHistory({ initialEntries: [url || '/'] })
    : createBrowserHistory();

  return createRouter({
    routeTree,
    history,
  });
}