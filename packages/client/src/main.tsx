import './i18n/i18n.ts'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'

import { AuthWrapper, QueryClientWrapper } from '@steamwgp/shared-ui'
import { router, BASE_URL, SAME_SITE, queryClient } from '@core'
import { Loader } from '@ui/index.ts'

import 'aos/dist/aos.css';
import 'react-loading-skeleton/dist/skeleton.css'


const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientWrapper queryClient={queryClient}>
        <AuthWrapper Loader={Loader} baseUrl={BASE_URL} sameSite={SAME_SITE}>
          <RouterProvider router={router} />
        </AuthWrapper>
      </QueryClientWrapper>
    </StrictMode>,
  )
}