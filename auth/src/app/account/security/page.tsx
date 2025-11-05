import { Metadata } from "next";
import { PasswordChangeForm } from "@/components/password-change-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Settings",
};

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account security and password settings
        </p>
      </div>

      <PasswordChangeForm />

      <Card className="bg-destructive/5 border-destructive/20">
        <CardHeader>
          <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription>
            Coming soon: Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Feature Not Yet Available</AlertTitle>
            <AlertDescription>
              Two-factor authentication support is coming in a future update.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
