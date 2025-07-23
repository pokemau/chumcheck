'use server';

import { requireAccessTokenOrRedirect } from '@/lib/auth';
import { BACKEND_API_URL } from '@/lib/constants';
import { User } from '@/lib/types';

export async function getMentors(): Promise<User[]> {
  const access = await requireAccessTokenOrRedirect();

  const response = await fetch(`${BACKEND_API_URL}/users?userRole=Mentor`, {
    headers: {
      Authorization: `Bearer ${access}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch startup data');
  }

  console.log(response);

  return response.json();
}
