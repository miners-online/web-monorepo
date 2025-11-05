"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  User,
  Lock,
  Smartphone,
  LogOut,
//   Code2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "Profile",
    href: "/account/profile",
    icon: User,
    description: "Manage your profile information",
  },
  {
    label: "Security",
    href: "/account/security",
    icon: Lock,
    description: "Change password and security settings",
  },
  {
    label: "Sessions",
    href: "/account/sessions",
    icon: Smartphone,
    description: "Manage active sessions",
  },
  {
    label: "Social Login",
    href: "/account/social",
    icon: LogOut,
    description: "Connect social accounts",
  },
//   {
//     label: "Developer",
//     href: "/account/developer",
//     icon: Code2,
//     description: "Register OIDC applications",
//   },
];

export function AccountNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4" />
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span
                  className={cn(
                    "text-xs",
                    isActive
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground/70"
                  )}
                >
                  {item.description}
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        );
      })}
    </nav>
  );
}
