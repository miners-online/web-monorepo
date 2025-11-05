import { Metadata } from "next";
import { SocialLoginManagement } from "@/components/social-login-management";

export const metadata: Metadata = {
  title: "Social Login",
};

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Login</h1>
        <p className="text-muted-foreground mt-2">
          Connect your account with social media providers
        </p>
      </div>

      <SocialLoginManagement />
    </div>
  );
}
