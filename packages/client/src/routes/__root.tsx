import { Suspense } from 'react'

import { ToastContainer } from 'react-toastify'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import Navbar from '@ui/organisms/Navbar/Navbar'
import { Footer } from '@ui/organisms/Footer/Footer'
import { Loader } from '@ui/atoms/Loader/Loader'

import WebSocketManager from '@core/services/websocket/WebsocketManager'

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
