import { Suspense } from 'react'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Navbar from '../components/organisms/Navbar'

export const Route = createRootRoute({
  component: () => (
    <>
    <Suspense fallback={<div>Chargement ...</div>}>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
    </>
  ),
})
