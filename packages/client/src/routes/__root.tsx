import { Suspense } from 'react'

import { ToastContainer } from 'react-toastify'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Footer, Navbar } from '@ui/organisms'
import { Loader } from '@ui/molecules'

import WebSocketManager from '@core/services/WebSockets/WebsocketManager'

import "react-toastify/dist/ReactToastify.css";

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
        { process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools /> }
      </Suspense>
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
