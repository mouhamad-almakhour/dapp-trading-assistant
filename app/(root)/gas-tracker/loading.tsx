import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* GasWidget */}
      <Card className="trading-card h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-8" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center space-y-1">
                <Skeleton className="h-3 w-12 mx-auto" />
                <Skeleton className="h-7 w-16 mx-auto" />
                <Skeleton className="h-3 w-8 mx-auto" />
              </div>
            ))}
          </div>
          <Skeleton className="h-4 w-36 mx-auto" />
        </CardContent>
      </Card>

      {/* ActiveAlerts */}
      <Card className="trading-card h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-3 w-6" />
          </div>
        </CardHeader>
        <CardContent className="space-y-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
          <Skeleton className="h-4 w-24 mx-auto mt-3" />
        </CardContent>
      </Card>
    </div>
  );
}
