"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { Skeleton } from "@repo/ui/components/skeleton"
import { Users, Server, RefreshCw } from "lucide-react"
import { Button } from "@repo/ui/components/button"

interface ServerStatus {
  online: boolean
  motd?: {
    clean?: string
    raw?: string,
    html?: string
  }
  players?: {
    online: number
    max: number
  }
  host?: string
  port?: number
}

interface MinecraftServerStatusProps {
  serverAddress: string
  refreshInterval?: number
  forceOfflineWithMatchingMOTD?: string
}

export function MinecraftServerStatus({ serverAddress, refreshInterval = 30000, forceOfflineWithMatchingMOTD }: MinecraftServerStatusProps) {
  const [status, setStatus] = useState<ServerStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchServerStatus = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverAddress}`)

      if (!response.ok) {
        throw new Error("Failed to fetch server status")
      }

      const data = await response.json()

      // Force offline status based on MOTD match
      if (data.motd && data.motd.clean) {
        const normalize = (s?: string) =>
          s
            ? s
                // convert escaped newline sequences like "\n" or "\r\n" into actual newlines
                .replace(/\\r\\n/g, "\n")
                .replace(/\\n/g, "\n")
                // normalize any actual CRLF sequences to LF
                .replace(/\r\n/g, "\n")
                .trim()
            : s
        const motdClean = normalize(data.motd.clean)
        const matchTarget = normalize(forceOfflineWithMatchingMOTD)
        if (matchTarget && motdClean === matchTarget) {
          data.online = false
        }
      }

      setStatus(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServerStatus()

    const interval = setInterval(fetchServerStatus, refreshInterval)

    return () => clearInterval(interval)
  }, [serverAddress, refreshInterval])

  if (loading && !status) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>Failed to fetch server status</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchServerStatus} variant="outline" size="sm" className="mt-4 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              {serverAddress}
            </CardTitle>
            <CardDescription>Minecraft Server</CardDescription>
          </div>
          <Badge
            variant={status?.online ? "default" : "secondary"}
            className={status?.online ? "bg-green-500 hover:bg-green-600" : "bg-muted"}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full mr-2 ${
                status?.online ? "bg-white" : "bg-muted-foreground"
              }`}
            />
            {status?.online ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {status?.online && (
          <>
            {/* Player Count */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Players Online</p>
                <p className="text-2xl font-bold">
                  {status.players?.online || 0}
                  <span className="text-sm text-muted-foreground font-normal"> / {status.players?.max || 0}</span>
                </p>
              </div>
            </div>

            {/* MOTD */}
            {status.motd && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Message of the Day</p>
                <div className="p-3 rounded-lg bg-muted/50 font-mono text-sm leading-relaxed">
                  {status.motd.html ? (
                    <div dangerouslySetInnerHTML={{ __html: status.motd.html }} />
                  ) : (
                    <pre>{status.motd.clean}</pre>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {!status?.online && (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">Server is currently offline</p>
          </div>
        )}

        {/* Last Updated */}
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            {lastUpdated && `Updated ${lastUpdated.toLocaleTimeString()}`}
          </p>
          <Button onClick={fetchServerStatus} variant="ghost" size="sm" disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
