/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LibraryImport } from './routes/library'
import { Route as IndexImport } from './routes/index'
import { Route as SteamderSteamderIdImport } from './routes/steamder/$steamderId'

// Create Virtual Routes

const SteamdersLazyImport = createFileRoute('/steamders')()
const LoginLazyImport = createFileRoute('/login')()
const LegalsLazyImport = createFileRoute('/legals')()
const CguLazyImport = createFileRoute('/cgu')()

// Create/Update Routes

const SteamdersLazyRoute = SteamdersLazyImport.update({
  path: '/steamders',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/steamders.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const LegalsLazyRoute = LegalsLazyImport.update({
  path: '/legals',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/legals.lazy').then((d) => d.Route))

const CguLazyRoute = CguLazyImport.update({
  path: '/cgu',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/cgu.lazy').then((d) => d.Route))

const LibraryRoute = LibraryImport.update({
  path: '/library',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SteamderSteamderIdRoute = SteamderSteamderIdImport.update({
  path: '/steamder/$steamderId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/library': {
      preLoaderRoute: typeof LibraryImport
      parentRoute: typeof rootRoute
    }
    '/cgu': {
      preLoaderRoute: typeof CguLazyImport
      parentRoute: typeof rootRoute
    }
    '/legals': {
      preLoaderRoute: typeof LegalsLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/steamders': {
      preLoaderRoute: typeof SteamdersLazyImport
      parentRoute: typeof rootRoute
    }
    '/steamder/$steamderId': {
      preLoaderRoute: typeof SteamderSteamderIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  LibraryRoute,
  CguLazyRoute,
  LegalsLazyRoute,
  LoginLazyRoute,
  SteamdersLazyRoute,
  SteamderSteamderIdRoute,
])

/* prettier-ignore-end */
