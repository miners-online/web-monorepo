"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Plus,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function DeveloperMenu() {
  const [newApp, setNewApp] = useState({ name: "", redirectUri: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newApp.name || !newApp.redirectUri) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Register the application using Better Auth's oauth2.register method
      await authClient.oauth2.register({
        redirect_uris: [newApp.redirectUri],
        token_endpoint_auth_method: "client_secret_basic",
      });

      setNewApp({ name: "", redirectUri: "" });
      setIsDialogOpen(false);
      toast.success("Application created successfully");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to create application";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Developer Mode</AlertTitle>
        <AlertDescription>
          Register and manage OIDC applications for third-party integrations.
          Keep your client secrets safe.
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">OIDC Applications</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage OAuth 2.0 / OpenID Connect applications
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Application
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Application</DialogTitle>
              <DialogDescription>
                Create a new OIDC application for your integration
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateApp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appName">Application Name</Label>
                <Input
                  id="appName"
                  value={newApp.name}
                  onChange={(e) =>
                    setNewApp((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="My Application"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="redirectUri">Redirect URI</Label>
                <Input
                  id="redirectUri"
                  value={newApp.redirectUri}
                  onChange={(e) =>
                    setNewApp((prev) => ({
                      ...prev,
                      redirectUri: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/callback"
                  type="url"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="ml-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Application"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
