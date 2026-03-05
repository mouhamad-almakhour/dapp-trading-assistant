import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <Skeleton className="h-32 w-full rounded-xl" />

      {/* Avatar + name row */}
      <div className="px-6 -mt-10 mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
        <Skeleton className="h-24 w-24 rounded-full border-4 border-background shrink-0" />
        <div className="flex flex-col gap-2 pb-1">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>

      {/* Divider */}
      <div className="px-6">
        <div className="border-t mb-8" />
      </div>

      {/* Title */}
      <div className="px-6 mb-6 space-y-2">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Two-column forms */}
      <div className="px-6 pb-10 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left card */}
        <div className="flex-1 rounded-xl border bg-card shadow-sm p-6 space-y-3">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Right cards */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="rounded-xl border bg-card shadow-sm p-6 space-y-3">
            <Skeleton className="h-5 w-28" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="rounded-xl border bg-card shadow-sm p-6 space-y-3">
            <Skeleton className="h-5 w-20" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="rounded-xl border border-destructive/30 bg-destructive/5 shadow-sm p-6 space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
