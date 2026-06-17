export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

function timestamp() {
  return new Date().toISOString()
}

function formatMeta(meta?: Record<string, unknown>) {
  if (!meta || Object.keys(meta).length === 0) return ''
  const parts = Object.entries(meta).map(([key, value]) => {
    if (typeof value === 'string') return `${key}=${JSON.stringify(value)}`
    return `${key}=${JSON.stringify(value)}`
  })
  return ` ${parts.join(' ')}`
}

export function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const line = `[${timestamp()}] ${level.toUpperCase()} ${message}${formatMeta(meta)}`
  if (level === 'error') {
    console.error(line)
    return
  }
  if (level === 'warn') {
    console.warn(line)
    return
  }
  console.log(line)
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => log('debug', message, meta),
  info: (message: string, meta?: Record<string, unknown>) => log('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log('error', message, meta),
}
