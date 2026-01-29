"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleSignout = async () => {
    await signOut();
    router.push("/sign-in");
  };
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <Button onClick={handleSignout}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
