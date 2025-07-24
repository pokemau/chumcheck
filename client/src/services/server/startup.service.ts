'use server';

import { requireAccessTokenOrRedirect } from '@/lib/auth';
import { BACKEND_API_URL } from '@/lib/constants';
import { Initiative, RNA, Startup } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function getStartupById(startupId: number): Promise<Startup> {
  const access = await requireAccessTokenOrRedirect();

  const response = await fetch(`${BACKEND_API_URL}/startups/${startupId}`, {
    headers: {
      Authorization: `Bearer ${access}`
    },
    next: {
      revalidate: 3600
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch startup data');
  }

  return response.json();
}

export async function setStartupToRated(startupId: number) {
  const access = await requireAccessTokenOrRedirect();

  // await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
  const response = await fetch(`${BACKEND_API_URL}/startups/${startupId}/set-to-rated`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`
    }
  });

  revalidatePath('/applications');

  if (!response.ok) {
    throw new Error('Failed to fetch startup data');
  }
}

export async function setStartupToQualified(startupId: number) {
  const access = await requireAccessTokenOrRedirect();

  const response = await fetch(`${BACKEND_API_URL}/startups/${startupId}/set-to-qualified`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`
    }
  });

  revalidatePath('/applications');

  if (!response.ok) {
    throw new Error('Failed to fetch startup data');
  }
}

export async function rejectStartup(startupId: number) {
  const access = await requireAccessTokenOrRedirect();

  const response = await fetch(`${BACKEND_API_URL}/startups/${startupId}/reject`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`
    }
  });

  revalidatePath('/applications');

  if (!response.ok) {
    throw new Error('Failed to reject startup');
  }
}

export async function approveStartup(startupId: number, mentorId: number) {
  const access = await requireAccessTokenOrRedirect();

  const response = await fetch(`${BACKEND_API_URL}/startups/${startupId}/approve-temp`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mentorId })
  });

  if (!response.ok) {
    throw new Error('Failed to approve startup');
  }

  await fetch(`${BACKEND_API_URL}/startups/${startupId}/appoint-mentor-temp`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mentorId: mentorId
    })
  });

  revalidatePath('/applications');
}

export async function getStartups(): Promise<Startup[]> {
  // await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

  const access = await requireAccessTokenOrRedirect();

  const response = await fetch(`${BACKEND_API_URL}/startups`, {
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

  const data: RNA[] = await res.json();

  return data;
}
