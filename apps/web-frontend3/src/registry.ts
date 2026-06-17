import path from 'node:path'
import { logger } from './lib/logger.js'

export type PageRoute = {
  route: string
  file: string
}

const pages: PageRoute[] = [
  { route: '/', file: 'index.html' },
  { route: '/about', file: 'about.html' },
  { route: '/docs', file: 'docs.html' },
]

const pageByRoute = new Map<string, string>()

for (const page of pages) {
  pageByRoute.set(normalizeRoute(page.route), page.file)
  logger.info('Registered HTML route', { route: page.route, file: page.file })
}

export function normalizeRoute(route: string) {
  if (!route.startsWith('/')) return `/${route}`
  if (route !== '/' && route.endsWith('/')) return route.slice(0, -1)
  return route
}

export function getRegisteredRoutes() {
  return [...pageByRoute.entries()].map(([route, file]) => ({ route, file }))
}

export function resolvePageFile(routePath: string) {
  const normalized = normalizeRoute(routePath)
  return pageByRoute.get(normalized)
}

export function resolvePageFilePath(pagesDir: string, routePath: string) {
  const file = resolvePageFile(routePath)
  if (!file) return null
  return path.join(pagesDir, file)
}

export function registerPage(route: string, file: string) {
  const normalized = normalizeRoute(route)
  pageByRoute.set(normalized, file)
  logger.info('Registered HTML route', { route: normalized, file })
}
