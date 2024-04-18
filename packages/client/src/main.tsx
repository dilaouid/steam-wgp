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
export const router = createRouter({ routeTree })

import 'aos/dist/aos.css';
import 'react-loading-skeleton/dist/skeleton.css'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      retry: false
    },
  },
})
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