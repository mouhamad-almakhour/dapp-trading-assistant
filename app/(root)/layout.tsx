import LightRays from "@/components/LightRays";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.session.userId) redirect("/sign-in");

  const user = {
    id: session.session.userId,
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 hidden md:block">
        <LightRays
          raysOrigin="bottom-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={1.1}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0.2}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={0.7}
        />
      </div>

      <main>{children}</main>
    </div>
  );
};
export default layout;
