export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  console.log('params', id);

  return (
    <div>
      <h1>INITIATIVES</h1>
    </div>
  );
}

