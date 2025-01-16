import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Sidebar } from '@ui/organisms/Sidebar'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <Outlet />
      </div>
    </React.Fragment>
  )
}
