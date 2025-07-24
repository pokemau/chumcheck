import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


// Usage example for 4 skeletons
export default function RnaCardsSkeletonGrid() {
  return (
    <div className="grid grid-cols-4 gap-5">
      <RnaCardSkeleton />
      <RnaCardSkeleton />
      <RnaCardSkeleton />
      <RnaCardSkeleton />
    </div>
  );
}

function RnaCardSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Skeleton className="w-20 h-6 rounded" />
          <Skeleton className="w-16 h-6 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-3/4 h-4" />
      </CardContent>
    </Card>
  );
}