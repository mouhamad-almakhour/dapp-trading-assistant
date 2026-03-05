"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LogoutEverywhereButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogoutEverywhere() {
    setLoading(true);
    const { error } = await authClient.revokeSessions();
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to log out everywhere");
    } else {
      toast.success("Logged out from all devices");
      router.push("/sign-in");
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleLogoutEverywhere}
      disabled={loading}
      className="w-full"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        "Log out everywhere"
      )}
    </Button>
  );
}
