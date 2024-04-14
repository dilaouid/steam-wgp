import { Suspense } from 'react'

import { ToastContainer } from 'react-toastify'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import Navbar from '../components/organisms/Navbar'
import { Footer } from '../components/organisms/Footer'
import { Loader } from '../components/atoms/Loader'
import WebSocketManager from '../services/websocket/WebsocketManager'

const RootComponent = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <WebSocketManager />
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
