'use server';

import { requireAccessTokenOrRedirect } from '@/lib/auth';
import { BACKEND_API_URL } from '@/lib/constants';
import { Initiative, RNA, Startup } from '@/lib/types';

export async function getStartups(): Promise<Startup[]> {
  // await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

  const access = await requireAccessTokenOrRedirect();

  const response = await fetch(`${BACKEND_API_URL}/startups/startups`, {
    headers: {
      Authorization: `Bearer ${access}`
    }
    // next: { revalidate: 60 }
  });

  const data: Startup[] = await response.json();
  const startupsWithInitiatives = await Promise.all(
    data.map(async (startup) => {
      const initiativesRes = await fetch(`${BACKEND_API_URL}/initiatives?startupId=${startup.id}`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });
      const initiatives: Initiative[] = await initiativesRes.json();
      return {
        ...startup,
        initiatives
      };
    })
  );

  return startupsWithInitiatives;
}

export async function getStartupInitiatives(startupId: number): Promise<Initiative[]> {
  const access = await requireAccessTokenOrRedirect();

  const res = await fetch(`${BACKEND_API_URL}/initiatives?startupId=${startupId}`, {
    headers: {
      Authorization: `Bearer ${access}`
    }
    // next: { revalidate: 60 }
  });

  const data = await res.json();

  return data;
}

export async function getStartupRna(startupId: number): Promise<RNA[]> {
  const access = await requireAccessTokenOrRedirect();

  const res = await fetch(`${BACKEND_API_URL}/rna?startupId=${startupId}`, {
    headers: {
      Authorization: `Bearer ${access}`
    }
    // next: { revalidate: 60 }
  });

  const data = await res.json();

  return data;
}
