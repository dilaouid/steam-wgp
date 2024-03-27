import './i18n/i18n.ts'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { AuthWrapper } from './components/wrappers/AuthWrapper.tsx'
const router = createRouter({ routeTree })

const queryClient = new QueryClient()
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthWrapper> 
        <RouterProvider router={router} />

      </AuthWrapper>
      </QueryClientProvider>
    </StrictMode>,
  )
}