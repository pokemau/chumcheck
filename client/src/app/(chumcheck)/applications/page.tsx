import { getStartups } from '@/services/server/startup.service';
import Applications from './Applications';
import { Suspense } from 'react';

export default async function Page() {
  const startups = getStartups();

  return (
    <Suspense fallback={ <div>Loading...</div>}>
      <Applications startupsPromise={startups} />
    </Suspense>
  );
}
