import RnaCards from './_components/RnaCards';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <RnaCards startupId={Number(id)} />
    </>
  );
}
