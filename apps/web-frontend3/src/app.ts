import { Hono } from 'hono'
import { fileURLToPath } from 'node:url'
import { logger } from './lib/logger.js'
import { contentTypeFor, safeJoin, tryReadBinaryFile } from './lib/fs.js'
import { resolvePageFilePath, getRegisteredRoutes } from './registry.js'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

const app = new Hono<{ Variables: { requestId: string } }>()
const appRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const pagesDir = path.join(appRoot, 'src', 'content', 'pages')
const assetsDir = path.join(appRoot, 'public', 'assets')

app.use('*', async (c, next) => {
  const requestId = randomUUID()
  const startedAt = Date.now()
  c.set('requestId', requestId)

  logger.info('Incoming request', {
    requestId,
    method: c.req.method,
    path: c.req.path,
    query: c.req.query(),
  })

  try {
    await next()
    const elapsed = Date.now() - startedAt
    logger.info('Completed request', {
      requestId,
      status: c.res.status,
      elapsedMs: elapsed,
      path: c.req.path,
    })
  } catch (error) {
    const elapsed = Date.now() - startedAt
    logger.error('Request failed', {
      requestId,
      elapsedMs: elapsed,
      path: c.req.path,
      error: error instanceof Error ? error.message : String(error),
    })
    throw error
  }
})

app.get('/assets/*', async (c) => {
  const requested = c.req.path.replace(/^\/assets\//, '')
  const filePath = safeJoin(assetsDir, requested)

  logger.debug('Serving asset', { requested, filePath })

  const bytes = await tryReadBinaryFile(filePath)
  if (!bytes) {
    logger.warn('Asset not found', { requested, filePath })
    return c.text('Asset not found', 404)
  }

  return new Response(bytes, {
    headers: {
      'Content-Type': contentTypeFor(filePath),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
})

app.get('*', async (c) => {
  const filePath = resolvePageFilePath(pagesDir, c.req.path)

  if (!filePath) {
    logger.warn('No HTML route matched', { path: c.req.path })
    return c.html(
      `<!doctype html><html><head><meta charset="utf-8"><title>404</title></head><body><h1>404</h1><p>No page was registered for <code>${c.req.path}</code>.</p></body></html>`,
      404,
    )
  }

  logger.debug('Serving HTML page', { path: c.req.path, filePath })
  const bytes = await tryReadBinaryFile(filePath)
  if (!bytes) {
    logger.warn('HTML file not found', { path: c.req.path, filePath })
    return c.html('<!doctype html><html><head><meta charset="utf-8"><title>404</title></head><body><h1>404</h1><p>Page file missing.</p></body></html>', 404)
  }

  return new Response(bytes, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
})

export default app
