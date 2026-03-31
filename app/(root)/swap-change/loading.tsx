import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main swap card */}
        <div className="lg:col-span-2">
          <Card className="trading-card-dark">
            <CardHeader>
              <Skeleton className="h-5 w-28" />
            </CardHeader>
            <CardContent className="space-y-4">
              {/* From */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-10" />
                <div className="flex gap-2">
                  <Skeleton className="h-14 flex-1" />
                  <Skeleton className="h-14 w-32 rounded-md" />
                </div>
              </div>

              {/* Flip button */}
              <div className="flex justify-center">
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>

              {/* To */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-6" />
                <div className="flex gap-2">
                  <Skeleton className="h-14 flex-1" />
                  <Skeleton className="h-14 w-32 rounded-md" />
                </div>
              </div>

              {/* Button */}
              <Skeleton className="h-12 w-full" />

              {/* Alert */}
              <Skeleton className="h-14 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="trading-card">
            <CardHeader>
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
