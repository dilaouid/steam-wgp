import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Sidebar } from '@ui/organisms/Sidebar'
import { Navbar } from '@ui/organisms/Navbar/Navbar'
import { Suspense } from 'react'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <Suspense fallback={<></>}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 p-8 lg:ml-64">
            <Outlet />
          </main>
        </div>
      </div>
    </Suspense>
  )
}
