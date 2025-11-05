"use client";

import { AccountNavigation } from "@/components/account-navigation";
import { MobileAccountNav } from "@/components/mobile-account-nav";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Navigation Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-muted/30 p-6 gap-8">
        <div>
          <h1 className="text-xl font-bold text-foreground">Account</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your account settings
          </p>
        </div>
        <AccountNavigation />
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between border-b border-border bg-muted/30 px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Account</h1>
          </div>
          <MobileAccountNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
