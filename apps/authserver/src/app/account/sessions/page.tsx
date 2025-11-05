import { Metadata } from "next";
import { SessionsManagement } from "@/components/sessions-management";

export const metadata: Metadata = {
  title: "Sessions Management",
};

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all your active sessions across devices
        </p>
      </div>

      <SessionsManagement />
    </div>
  );
}
