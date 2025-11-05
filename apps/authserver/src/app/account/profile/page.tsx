import { Metadata } from "next";
import { ProfileForm } from "@/components/profile-form";

export const metadata: Metadata = {
  title: "Profile Settings",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and profile picture
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
