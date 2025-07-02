
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;


  console.log('params', id);

  return (
    <div>
      {/* <RadarChart /> */}
      <h1>RADAR CHART {id}</h1>
    </div>
  );
}

