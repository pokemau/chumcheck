import { getStartups } from "@/services/startup.service";

export default async function Startups() {

  const data = await getStartups();

  return (
    <div>
      {data.map((startup: { id: number, name: string }) => (
        <div key={startup.id}>
          <h1>{startup.name}</h1>
        </div>
      ))}
    </div>
  )
}

