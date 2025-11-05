import { Metadata } from "next";
import { DeveloperMenu } from "@/components/developer-menu";

export const metadata: Metadata = {
  title: "Developer Settings",
};

export default function DeveloperPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Developer</h1>
        <p className="text-muted-foreground mt-2">
          Register and manage OIDC applications for integrations
        </p>
      </div>

      <DeveloperMenu />
    </div>
  );
}
