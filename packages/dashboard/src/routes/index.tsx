import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/")({
    component: DashboardLayout
})

function DashboardLayout () {  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="lg:pl-64 pt-16">
        {/* Votre contenu */}
      </main>
    </div>
  )
}