"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Bell, ChevronDown, LogOut, Moon, Sun, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "System overview and statistics",
  },
  "/dashboard/users": {
    title: "Users Management",
    description: "System user management",
  },
  "/dashboard/roles": {
    title: "Roles Management",
    description: "Managing roles and access",
  },
};

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const { title, description } = PAGE_METADATA[pathname] || {};

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-10 flex h-18 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-semibold md:text-xl text-foreground">{title}</h1>
        <p className="text-sm md:text-base text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-3 ">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex relative cursor-pointer">
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 pl-1 cursor-pointer select-none">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 overflow-hidden">
                {user?.avatar ? (
                  <Image src={user?.avatar} alt="avatar" fill className="object-cover" />
                ) : (
                  <UserIcon className="h-5 w-5" />
                )}
              </div>

              <div className="hidden md:flex flex-col items-start text-sm">
                <span className="font-medium leading-none">{user?.fullName || "User"}</span>
              </div>

              <ChevronDown
                className={`hidden md:flex ml-auto h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] mr-4 md:mr-0">
            <DropdownMenuItem className="flex md:hidden">
              <Bell className="h-5 w-5" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTheme} className="flex md:hidden">
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              Theme
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="flex gap-1 cursor-pointer">
              <LogOut className="w-5 h-5" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
