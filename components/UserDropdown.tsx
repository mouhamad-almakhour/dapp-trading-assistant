"use client";
//import { useConnection, useDisconnect } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import NavItems from "./Navitems";
import { signOut } from "@/lib/actions/auth.actions";
import { Wallet, LogOut, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { useSession } from "@/lib/better-auth/auth-client";

const UserDropdown = () => {
  const { data: session } = useSession();
  const router = useRouter();
  //   const { address, isConnected, chain } = useConnection();
  //   const disconnect = useDisconnect();
  const address: string = "0X3959679444";
  const chain = {
    name: "Ethereum",
    id: 1,
  };
  if (!session?.user) return null;
  const user = session.user;
  // Format address for display
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    }
  };

  // View on Etherscan
  const viewOnExplorer = () => {
    if (address) {
      const explorerUrl = "https://etherscan.io";
      {
        /*chain?.blockExplorers?.default.url|| */
      }
      window.open(`${explorerUrl}/address/${address}`, "_blank");
    }
  };

  const handleSignout = async () => {
    // if (isConnected && address) disconnect.mutate();

    await signOut();
    router.push("/sign-in");
  };

  // if (isConnected && address)
  if (address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="user-dropdown-trigger">
            <Avatar className="user-dropdown-avatar">
              <AvatarImage
                src={user.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="user-dropdown-avatar-fallback">
                {user.name}
              </AvatarFallback>
            </Avatar>
            <div className="user-dropdown-wallet">
              <Wallet className="h-4 w-4" />
              <span>{formatAddress(address)}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="user-dropdown-content">
          <DropdownMenuLabel className="user-dropdown-label">
            <Avatar className="user-dropdown-avatar-large">
              <AvatarImage
                src={user.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="user-dropdown-avatar-fallback">
                {user.name}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="user-dropdown-name">
                {formatAddress(address)}
              </span>
              <span className="user-dropdown-email">{user.email}</span>
              <span className="user-dropdown-chain">
                Connected to {chain?.name || "Ethereum"}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="user-dropdown-separator" />
          <DropdownMenuItem
            onClick={copyAddress}
            className="user-dropdown-item"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={viewOnExplorer}
            className="user-dropdown-item"
          >
            <ExternalLink className="mr-2 h-4 w-4 " />
            View on {chain?.name || "Explorer"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSignout}
            className="user-dropdown-item user-dropdown-item-danger cursor-pointer"
          >
            <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
            Logout
          </DropdownMenuItem>
          {/* Mobile nav */}
          <DropdownMenuSeparator className="user-dropdown-separator sm:hidden" />
          <nav className="sm:hidden">
            <NavItems variant="dashboard" />
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="user-dropdown-trigger">
          <Avatar className="user-dropdown-avatar">
            <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
            <AvatarFallback className="user-dropdown-avatar-fallback">
              {user.name}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="user-dropdown-name">{user.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="user-dropdown-content">
        <DropdownMenuLabel className="user-dropdown-label">
          <Avatar className="user-dropdown-avatar-large">
            <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
            <AvatarFallback className="user-dropdown-avatar-fallback">
              {user.name}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="user-dropdown-name">{user.name}</span>
            <span className="user-dropdown-email">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="user-dropdown-separator" />
        <DropdownMenuItem
          onClick={handleSignout}
          className="user-dropdown-item user-dropdown-item-danger cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator className="user-dropdown-separator sm:hidden" />
        <nav className="sm:hidden">
          <NavItems variant="dashboard" />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
