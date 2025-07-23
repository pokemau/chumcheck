import { getStartups } from '@/services/server/startup.service';
import Applications from './Applications';
import { Suspense } from 'react';
import { getMentors } from '@/services/server/user.service';

export default async function Page() {
  const startups = getStartups();
  const mentors = getMentors();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Applications startupsPromise={startups} mentorsPromise={mentors} />
    </Suspense>
  );
}
