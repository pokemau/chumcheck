
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: startupId } = await params;


  console.log('params', startupId);

  return (
    <div>
      {/* <RadarChart /> */}
      <h1>RADAR CHART</h1>
    </div>
  );
}

