import { serve } from '@hono/node-server'
import app from './app.js'
import { logger } from './lib/logger.js'

const port = Number(process.env.PORT ?? 3000)

logger.info('Starting local Hono server', { port })
serve({ fetch: app.fetch, port })
