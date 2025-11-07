"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Button } from "@repo/ui/components/button"
import { Settings, LogOut } from "lucide-react"

import { useAuthContext } from "@repo/auth-client/hooks/use-auth-context"

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function fallbackComponent({signIn}: {signIn: () => Promise<void>}) {
  return <Button variant="secondary" onClick={signIn}>Sign in</Button>
}


export function UserAccountDropdown() {

  const handleSettings = () => {
    console.log("Settings clicked")
  }

  const { state, signIn, signOut } = useAuthContext();

  console.log("UserAccountDropdown state:", state);

  if (!state) {
    return fallbackComponent({signIn});
  }
  const user = state.claims;

  if (!user) {
    return fallbackComponent({signIn});
  }

  const name = user.name || "Unknown User";
  const initials = getInitials(name);
  const email = user.email || "No Email";
  const picture = user.picture || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-7 w-7 rounded-full" aria-label="Open user menu">
          <Avatar className="h-7 w-7">
            <AvatarImage src={picture} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={picture} alt={name} />
              <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">{email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
