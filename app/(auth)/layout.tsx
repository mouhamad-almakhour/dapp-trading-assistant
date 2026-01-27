import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LightRays from "@/components/LightRays";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect("/");

  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-4">
        {children}
      </div>

      <div className="fixed inset-0 -z-10 hidden md:block">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.5}
          lightSpread={1}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0.2}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={0.5}
        />
      </div>
    </main>
  );
};

export default layout;
