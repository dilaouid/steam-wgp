import './i18n/i18n.ts'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'

import { router } from '@core'
import { QueryClientWrapper, AuthWrapper } from '@layouts/wrappers'

import 'aos/dist/aos.css';
import 'react-loading-skeleton/dist/skeleton.css'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientWrapper>
        <AuthWrapper> 
          <RouterProvider router={router} />
        </AuthWrapper>
      </QueryClientWrapper>
    </StrictMode>,
  )
}