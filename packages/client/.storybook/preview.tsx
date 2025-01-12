import type { Preview } from "@storybook/react";
import { 
  RouterProvider, 
  createRouter, 
  createMemoryHistory,
  Route, 
  RootRoute 
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loading-skeleton/dist/skeleton.css"; 
import React from "react";

// Créer une route racine
const rootRoute = new RootRoute();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Créer une route par défaut pour les stories
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <></>
});

// Créer une route pour les liens externes Steam
const steamRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'store.steampowered.com',
  component: () => null,
});

// Définir l'arbre de routes
const routeTree = rootRoute.addChildren([indexRoute, steamRoute]);

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'], // URL initiale
});

// Créer le router
const router = createRouter({
  routeTree,
  history: memoryHistory,
});

// Déclarer le router pour TypeScript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Décorateur global pour le router
const withRouter = (StoryFn: React.ComponentType) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <StoryFn />
    </QueryClientProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withRouter],
};

export default preview;