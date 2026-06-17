import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function projectRoot() {
  return path.resolve(fileURLToPath(new URL('../..', import.meta.url)))
}

export function safeJoin(root: string, target: string) {
  const normalizedRoot = path.resolve(root)
  const normalizedTarget = path.resolve(root, target)

  if (normalizedTarget !== normalizedRoot && !normalizedTarget.startsWith(normalizedRoot + path.sep)) {
    throw new Error(`Path traversal blocked: ${target}`)
  }

  return normalizedTarget
}

export async function fileExists(filePath: string) {
  try {
    await readFile(filePath)
    return true
  } catch {
    return false
  }
}

export function contentTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8'
    case '.css':
      return 'text/css; charset=utf-8'
    case '.js':
      return 'application/javascript; charset=utf-8'
    case '.mjs':
      return 'application/javascript; charset=utf-8'
    case '.json':
      return 'application/json; charset=utf-8'
    case '.svg':
      return 'image/svg+xml'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    case '.ico':
      return 'image/x-icon'
    case '.txt':
      return 'text/plain; charset=utf-8'
    case '.woff':
      return 'font/woff'
    case '.woff2':
      return 'font/woff2'
    default:
      return 'application/octet-stream'
  }
}

export async function readBinaryFile(filePath: string) {
  return readFile(filePath)
}

export async function tryReadBinaryFile(filePath: string) {
  try {
    return await readFile(filePath)
  } catch (error) {
    return null
  }
}
