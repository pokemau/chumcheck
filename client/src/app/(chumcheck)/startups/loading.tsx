import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl font-extrabold">Startups</h1>
        <p>Manage assigned startups</p>
      </div>


      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
        <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
        <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>


      </div>

      <div className="mb-5 w-full">
        <Skeleton className="mb-2 w-[400px] h-[38px]"></Skeleton>
        <Skeleton className="rounded-xl h-[30px] w-[537px]"></Skeleton>
      </div>

      {/* CARDS */}
      <div className="mt-3 pb-10 grid grid-cols-4 gap-3">
        <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
        <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
        <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
        <div className="rounded-lg bg-background "><Skeleton className="h-40 rounded-xl" /></div>
      </div>

    </div>
  );
}

