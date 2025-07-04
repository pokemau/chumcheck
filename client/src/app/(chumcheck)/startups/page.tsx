import { requireAccessTokenOrRedirect } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStartups } from "@/services/server/startup.service";
import Startups from "./_components/Startups";
import { QualificationStatus } from "@/lib/enums";

export default async function Page() {

  await requireAccessTokenOrRedirect();
  const startups = await getStartups();

  const pendingStartups = startups.filter(s => s.qualificationStatus < 3);
  const qualifiedStartups = startups.filter(s => s.qualificationStatus === QualificationStatus.QUALIFIED);
  const rejectedStartups = startups.filter(s => s.qualificationStatus === QualificationStatus.REJECTED);
  const pausedStartups = startups.filter(s => s.qualificationStatus === QualificationStatus.PAUSED);
  const completedStartups = startups.filter(s => s.qualificationStatus === QualificationStatus.COMPLETED);

  const allInitiatives = startups.flatMap(startup => startup.initiatives);
  const completedCount = completedStartups.length;
  const initiativesTotalCount = allInitiatives.length;
  const percent = initiativesTotalCount === 0 ? 0 : Math.round((completedCount / initiativesTotalCount) * 100);

  const completedQualifiedStartups = qualifiedStartups.filter(s => s.qualificationStatus === QualificationStatus.COMPLETED);

  const qualifiedCount = qualifiedStartups.length;
  const completedQualifiedCount = completedQualifiedStartups.length;
  const completionRate = qualifiedCount === 0 ? 0 : Math.round((completedQualifiedCount / qualifiedCount) * 100);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl font-extrabold">Startups</h1>
        <p>Manage assigned startups</p>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">

        <Card className="rounded-lg bg-background p-5 flex flex-col gap-1 border border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              <h1>{startups.length}</h1>
            </CardTitle>

            <CardDescription>
              <p>Total Startups</p>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex gap-2 flex-wrap">
            <div className="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-blue-500 text-blue-500 bg-slate-900">
              <span className="text-base">{qualifiedStartups.length}</span>
              <span>Qualified</span>
            </div>
            <div className="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-yellow-400 text-yellow-400 bg-yellow-900">
              <span className="text-base">{pendingStartups.length}</span>
              <span>Pending</span>
            </div>

            <div className="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-red-400 text-red-400 bg-red-900">
              <span className="text-base">{rejectedStartups.length}</span>
              <span>Rejected</span>
            </div>
            <div className="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-gray-400 text-gray-400 bg-gray-900">
              <span className="text-base">{pausedStartups.length}</span>
              <span>Paused</span>
            </div>
            <div className="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-green-500 text-green-500 bg-green-900">
              <span className="text-base">{completedStartups.length}</span>
              <span>Completed</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg bg-background p-5 flex flex-col gap-1 border border-border">
          <CardHeader>
            <CardDescription>
              <p>Initiatives Progress</p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">{completedCount}/{initiativesTotalCount}</span>
              <span className="ml-auto text-sm">{percent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded">
              <div className="h-2 bg-white rounded" style={{ width: `${percent}%` }} ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg bg-background p-5 flex flex-col gap-1 border border-border">
          <CardHeader>
            <CardDescription>
              <p>Completion Rate</p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">{completionRate}%</span>
            </div>
            <CardDescription>
              {completedQualifiedCount} of {qualifiedCount} startups completed
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Startups startups={startups} />
    </div>

  )
}

