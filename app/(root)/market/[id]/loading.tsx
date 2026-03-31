import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-42.5 w-full rounded-xl" />
          <Skeleton className="h-150 w-full rounded-xl" />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-10 w-full mt-5 rounded-md" />
          <Skeleton className="h-100 w-full rounded-xl" />
          <Skeleton className="h-116 w-full rounded-xl" />
        </div>
      </section>
    </div>
  );
}
