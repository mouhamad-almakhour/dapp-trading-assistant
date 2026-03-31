import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen home-wrapper py-6">
      {/* Ticker */}
      <div className="mx-auto w-[90%] mb-6">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* Section 1 */}
      <section className="home-section">
        <div className="col-span-3 md:col-span-1">
          <Skeleton className="h-150 w-full rounded-xl" />
        </div>
        <div className="col-span-3 md:col-span-2">
          <Skeleton className="h-150 w-full rounded-xl" />
        </div>
      </section>

      {/* Section 2 */}
      <section className="home-section">
        <div className="col-span-3 md:col-span-1">
          <Skeleton className="h-150 w-full rounded-xl" />
        </div>
        <div className="col-span-3 md:col-span-2">
          <Skeleton className="h-150 w-full rounded-xl" />
        </div>
      </section>
    </div>
  );
}
