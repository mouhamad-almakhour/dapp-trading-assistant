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

      <div className="min-h-screen flex overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="container max-w-7xl mx-auto py-6 px-4 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default layout;
