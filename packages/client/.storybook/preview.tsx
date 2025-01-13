import React, { useEffect } from "react";
import styled from "styled-components";
import type { Preview } from "@storybook/react";
import { 
  RouterProvider, 
  createRouter, 
  createMemoryHistory,
  Route, 
  RootRoute
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useAuthStore } from '@store/authStore';
import { useBtnGameStore } from '@store/hoverBtnGameStore';
import { useLibraryStore } from '@store/libraryStore';
import { useSteamderStore } from '@store/steamderStore';
import { useWebSocketStore } from '@store/websocketStore';

import './preview.css';
import "react-loading-skeleton/dist/skeleton.css"; 

import { defaultSteamderStore, defaultAuthStore } from "./default/store";
import { defaultStatsQuery, defaultSSEQuery } from "./default/query";

const StoryWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 768px;
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <></>
});

const steamRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'store.steampowered.com',
  component: () => null,
});

const routeTree = rootRoute.addChildren([indexRoute, steamRoute]);

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
});

const router = createRouter({
  routeTree,
  history: memoryHistory,
});

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
      useAuthStore.setState(defaultAuthStore);
      useBtnGameStore.setState({  });
      useLibraryStore.setState({ library: [], selected: [] });
      useSteamderStore.setState(defaultSteamderStore);
      useWebSocketStore.setState({  });
    };
  }, [context.story]);

  return <StoryFn />;
};


const withRouter = (StoryFn: React.ComponentType, context: any) => {
  const layout = context.parameters.layout || "centered"; 
  const Wrapper = layout === "fullwidth" ? FullWidthWrapper : StoryWrapper;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  queryClient.setQueryData(['stats'], defaultStatsQuery);
  queryClient.setQueryData(['login_sse'], defaultSSEQuery);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider 
        router={router} 
        defaultComponent={() => 
            <Wrapper>
              <StoryFn />
            </Wrapper>
        }
      />
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