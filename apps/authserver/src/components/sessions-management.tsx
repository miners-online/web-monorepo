"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Smartphone, Globe, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";

interface Session {
  id: string;
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export function SessionsManagement() {
  const { data: session } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const result = await authClient.listSessions();

        if (result && "data" in result && Array.isArray(result.data)) {
          setSessions(result.data as Session[]);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        toast.error("Failed to load sessions");
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchSessions();
    }
  }, [session]);

  const handleRevokeSession = async (sessionId: string) => {
    setIsRevoking(sessionId);

    try {
      await authClient.revokeSession({ token: sessionId });
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      toast.success("Session revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke session");
    } finally {
      setIsRevoking(null);
    }
  };

  const handleRevokeAllOthers = async () => {
    setIsRevoking("all");

    try {
      await authClient.revokeOtherSessions();
      setSessions((prev) => prev.filter((s) => s.id === session?.session?.id));
      toast.success("All other sessions revoked");
    } catch (error) {
      toast.error("Failed to revoke sessions");
    } finally {
      setIsRevoking(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Active Sessions</h2>
          <p className="text-sm text-muted-foreground">
            Manage your active sessions and sign out from other devices
          </p>
        </div>
        {sessions.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRevokeAllOthers}
            disabled={isRevoking !== null}
          >
            {isRevoking === "all" && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            Sign Out All Others
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center py-4">
                No active sessions found
              </p>
            </CardContent>
          </Card>
        ) : (
          sessions.map((sessionItem) => {
            const isCurrent = sessionItem.id === session?.session?.id;
            return (
              <Card key={sessionItem.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {sessionItem.userAgent?.includes("iPhone") ? (
                        <Smartphone className="h-5 w-5 text-muted-foreground mt-1" />
                      ) : (
                        <Globe className="h-5 w-5 text-muted-foreground mt-1" />
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {sessionItem.userAgent || "Unknown Device"}
                          </p>
                          {isCurrent && (
                            <Badge variant="default">Current</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          IP: {sessionItem.ipAddress || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created{" "}
                          {formatDistanceToNow(
                            new Date(sessionItem.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    {!isCurrent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeSession(sessionItem.id)}
                        disabled={isRevoking !== null}
                      >
                        {isRevoking === sessionItem.id && (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        )}
                        Sign Out
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
