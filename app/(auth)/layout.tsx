import Image from "next/image";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect("/");

  return (
    <main
      className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <section className="w-full lg:w-[45%] px-6 lg:px-16 py-8 lg:py-12 flex flex-col overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center"> {children} </div>
      </section>

      <section
        className="w-full max-lg:border-t lg:w-[55%] px-6 py-8 md:p-8 lg:py-12 lg:px-12 flex flex-col justify-between overflow-y-auto"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote
            className="text-sm md:text-xl lg:text-2xl font-medium mb-1 md:mb-6 lg:mb-8"
            style={{ color: "var(--muted-foreground)" }}
          >
            This my Dapp trading application project using Next.js .
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite style={{ color: "var(--foreground)" }}>
                - Mouhamad ALMAKHOUR
              </cite>
              <p
                className="max-md:text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                {" "}
                Full Stack Engineer
              </p>
            </div>

            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src="/icons/star.svg"
                  alt="Star"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex-1 flex items-center justify-center lg:justify-end">
          <Image
            src="/images/sign-in.png"
            alt="sign-in Preview"
            width={1400}
            height={1400}
          ></Image>
        </div>
      </section>
    </main>
  );
};

export default layout;
