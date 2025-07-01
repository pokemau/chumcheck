import { Skeleton } from "@/components/ui/skeleton";

export default function StartupsSkeleton() {
  return (

    <div className="mt-3 pb-10 grid grid-cols-4 gap-3">
      <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
      <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
      <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
    </div>
  )
}
