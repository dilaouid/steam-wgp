import { Suspense } from 'react'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Navbar from '../components/organisms/Navbar'
import { Footer } from '../components/organisms/Footer'
import { Loader } from '../components/atoms/Loader'

export const Route = createRootRoute({
  component: () => (
    <>
    <Suspense fallback={<Loader />}>
      <Navbar />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </Suspense>
    </>
  ),
})
