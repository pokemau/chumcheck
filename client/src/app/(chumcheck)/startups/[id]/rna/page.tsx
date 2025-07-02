
import { Card } from "@/components/ui/card";
import { getStartupRna } from "@/services/server/startup.service";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const rnaData = await getStartupRna(Number(id));

  console.log(rnaData)


  return (
    <div>
      {rnaData.map(rna => (

        <Card key={rna.id}>

          <h1>{rna.readinessLevel.readinessType}</h1>
          <p>{rna.rna}</p>
          <p>Current Level: {rna.readinessLevel.level}</p>

        </Card>
      ))}
    </div>
  );
}


