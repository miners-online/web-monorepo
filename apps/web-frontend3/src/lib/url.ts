export function normalizeRoute(route: string) {
    if (!route.startsWith('/')) return `/${route}`
    if (route !== '/' && route.endsWith('/')) return route.slice(0, -1)
    return route
}
