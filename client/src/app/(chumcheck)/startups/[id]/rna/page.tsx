import { getStartupRna } from "@/services/server/startup.service";
import RnaCards from "./_components/RnaCards";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const rnaData = await getStartupRna(Number(id));

  console.log(rnaData)


  return (
    <>
      <RnaCards rnaData={rnaData} />
    </>
  );
}


