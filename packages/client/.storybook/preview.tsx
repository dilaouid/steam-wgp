import type { Preview } from "@storybook/react";
import { 
  RouterProvider, 
  createRouter, 
  createMemoryHistory,
  Route, 
  RootRoute, 
  Outlet
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useAuthStore } from '@store/authStore';
import { useBtnGameStore } from '@store/hoverBtnGameStore';
import { useLibraryStore } from '@store/libraryStore';
import { useSteamderStore } from '@store/steamderStore';
import { useWebSocketStore } from '@store/websocketStore';

import './cyborg.min.css'
import "react-loading-skeleton/dist/skeleton.css"; 
import React, { useEffect } from "react";

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

const withZustand = (StoryFn: React.ComponentType, context: any) => {
  const initializeStore = () => {
    const storeParams = context.parameters.zustand || {};
    
    if (storeParams.authStore) useAuthStore.setState(storeParams.authStore);
    if (storeParams.hoverBtnGameStore) useBtnGameStore.setState(storeParams.hoverBtnGameStore);
    if (storeParams.libraryStore) useLibraryStore.setState(storeParams.libraryStore);
    if (storeParams.steamderStore) useSteamderStore.setState(storeParams.steamderStore);
    if (storeParams.websocketStore) useWebSocketStore.setState(storeParams.websocketStore);
  };

  useEffect(() => {
    initializeStore();
    return () => {
      useAuthStore.setState({ 
        isAuthenticated: false,
        toggleAuth: () => {},
        user: null,
        setUser: () => {}
      });
      useBtnGameStore.setState({ /* état initial */ });
      useLibraryStore.setState({ library: [], selected: [] });
      useSteamderStore.setState({
        steamder: {
          id: 'ac2e8e2d-3f7c-4c5e-8d6b-1c4b2c3b8c6d',
          name: 'Steamder Name',

          admin_id: '7823654',
          all_games: [10, 20, 30, 40, 50, 60, 70, 80, 240, 300, 320, 360],
          common_games: [10, 20, 30, 40, 50, 60, 70, 80, 240, 300, 320, 360],
          swiped_games: [10, 320, 360],
          choosed_game: 320,

          display_all_games: true,
          private: false,
          started: false,

          complete: false,
           // Date in 10 minutes
          endTime: Date.now() + 600000,

          created_at: new Date(),
          updated_at: new Date()
        }
      });
      useWebSocketStore.setState({ /* état initial */ });
    };
  }, [context.story]);

  return <StoryFn />;
};


const withRouter = (StoryFn: React.ComponentType) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} defaultComponent={() => <StoryFn />} />
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
  decorators: [withZustand, withRouter]
};

export default preview;