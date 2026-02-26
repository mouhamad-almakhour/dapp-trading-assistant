"use client";
import { useSession } from "@/lib/better-auth/auth-client";
import { EmailForm } from "./email-form";
import { LogoutEverywhereButton } from "./logout-everywhere-button";
import { PasswordForm } from "./password-form";
import { ProfileDetailsForm } from "./profile-details-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

export default function Settings() {
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top hero banner */}
      <div className="relative h-16 w-full r overflow-hidden" />

      {/* Avatar + name row — overlaps the banner */}
      <div className="px-6 -mt-10 mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="relative w-fit">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg user-dropdown-avatar-large">
            <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
            <AvatarFallback className="user-dropdown-avatar-fallback text-2xl font-semibold">
              {user.name}
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 shadow-md text-primary-foreground hover:bg-primary/90 transition-colors">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-col gap-1 pb-1">
          <div className="flex items-center gap-2">
            <span className="user-dropdown-name text-xl font-bold leading-tight">
              {user.name}
            </span>
            <Badge variant="secondary" className="text-xs">
              Pro
            </Badge>
          </div>
          <span className="user-dropdown-email text-sm text-muted-foreground">
            {user.email}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="px-6">
        <div className="border-t mb-8" />
      </div>

      {/* Page title */}
      <div className="px-6 mb-6">
        <h1 className="text-xl font-semibold tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your profile, email, and security preferences.
        </p>
      </div>

      {/* Two-column form layout */}
      <div className="px-6 pb-10 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left — profile details */}
        <div className="flex-1 rounded-xl  p-6">
          <ProfileDetailsForm user={user} />
        </div>

        {/* Right — email, password, logout */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="rounded-xl  p-6">
            <EmailForm currentEmail={user.email} />
          </div>

          <div className="rounded-xl p-6">
            <PasswordForm />
          </div>

          <div className="rounded-xl border border-destructive/30 bg-destructive/5 shadow-sm p-6">
            <h2 className="text-sm font-semibold mb-1 text-destructive">
              Danger Zone
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              This will log you out from all devices and active sessions.
            </p>
            <LogoutEverywhereButton />
          </div>
        </div>
      </div>
    </div>
  );
}
