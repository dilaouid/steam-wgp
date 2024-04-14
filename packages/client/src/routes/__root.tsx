import { Suspense, useEffect } from 'react'

import { ToastContainer } from 'react-toastify'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import useWebSocketStore from '../store/websocketStore'

import Navbar from '../components/organisms/Navbar'
import { Footer } from '../components/organisms/Footer'
import { Loader } from '../components/atoms/Loader'
import { getCookieValue } from '../utils/cookieUtils'
import { useAuthStore } from '../store/authStore'

const BASE_WS_URL = import.meta.env.VITE_BASE_WS_URL;

const RootComponent = () => {
  const { connect, disconnect } = useWebSocketStore();
  const { user } = useAuthStore.getState();

  useEffect(() => {
    const token = getCookieValue('token');
    if (!token || !user?.waitlist)
      return;

    const wsUrl = `${BASE_WS_URL}/ws/${user.waitlist}`;
    connect(wsUrl, token);

    return () => {
      disconnect();
    };
  }, [connect, disconnect, user]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            closeButton={false}
            theme="colored"
        />
        <Navbar />
        <Outlet />
        <Footer />
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
