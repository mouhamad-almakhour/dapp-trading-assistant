import LightRays from "@/components/LightRays";
import { Sidebar } from "@/components/SideBar";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.session?.userId) redirect("/sign-in");

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 hidden md:block">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.3}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="hidden sm:block w-64">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="container py-10">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default layout;
