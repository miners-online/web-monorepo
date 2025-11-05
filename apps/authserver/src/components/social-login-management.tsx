"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";

interface SocialProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const providers: SocialProvider[] = [
  {
    id: "github",
    name: "GitHub",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export function SocialLoginManagement() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [connectedProviders, setConnectedProviders] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchConnectedAccounts = async () => {
      try {
        const result = await authClient.listAccounts();
        if (result && "data" in result && Array.isArray(result.data)) {
          const providers = new Set(result.data.map((account: any) => account.providerId));
          setConnectedProviders(providers);
        }
      } catch (error) {
        console.error("Failed to fetch connected accounts:", error);
      }
    };

    if (session?.user) {
      fetchConnectedAccounts();
    }
  }, [session]);

  const handleConnect = async (providerId: string) => {
    setIsLoading(providerId);

    try {
      await authClient.signIn.social({
        provider: providerId,
        callbackURL: window.location.href,
      });
      toast.success(`Connected to ${providers.find((p) => p.id === providerId)?.name}`);
    } catch (error) {
      toast.error("Failed to connect provider");
    } finally {
      setIsLoading(null);
    }
  };

  const handleDisconnect = async (providerId: string) => {
    setIsLoading(providerId);

    try {
      // Better Auth provides unlinkAccount method for disconnecting social accounts
      await authClient.unlinkAccount({
        providerId: providerId,
      });
      toast.success("Social account disconnected");
      window.location.reload();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to disconnect provider";
      toast.error(errorMsg);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Social Login</h2>
        <p className="text-sm text-muted-foreground">
          Connect your account to social providers for easier login
        </p>
      </div>

      <div className="grid gap-4">
        {providers.map((provider) => {
          const isConnected = connectedProviders.has(provider.id);

          return (
            <Card key={provider.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg border border-border p-2">
                      {provider.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{provider.name}</p>
                        {isConnected && (
                          <Badge variant="default">Connected</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {isConnected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(provider.id)}
                      disabled={isLoading === provider.id}
                    >
                      {isLoading === provider.id && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(provider.id)}
                      disabled={isLoading === provider.id}
                    >
                      {isLoading === provider.id && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
