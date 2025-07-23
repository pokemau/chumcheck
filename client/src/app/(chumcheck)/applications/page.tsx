import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QualificationStatus } from '@/lib/enums';
import { getStartups } from '@/services/server/startup.service';

export default async function Page() {
  const startups = await getStartups();

  const pendingStartups = startups.filter((startup) => startup.qualificationStatus === QualificationStatus.PENDING);
  const ratedStartups = startups.filter((startup) => startup.qualificationStatus === QualificationStatus.RATED);
  const qualifiedStartups = startups.filter((startup) => startup.qualificationStatus === QualificationStatus.QUALIFIED);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rated">Rated</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>PENDING</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {pendingStartups.map((startup) => (
                <div key={startup.id}>
                  <h1>{startup.name}</h1>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rated">
          <Card>
            <CardHeader>
              <CardTitle>RATED</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {ratedStartups.map((startup) => (
                <div key={startup.id}>
                  <h1>{startup.name}</h1>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qualified">
          <Card>
            <CardHeader>
              <CardTitle>QUALIFIED</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {qualifiedStartups.map((startup) => (
                <div key={startup.id}>
                  <h1>{startup.name}</h1>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
