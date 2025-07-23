'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BACKEND_API_URL } from './constants';
import { Role } from './enums';
import { User } from './types';
import { headers } from 'next/headers';
// import { jwtVerify } from 'jose';

export async function requireAccessTokenOrRedirect() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('Access')?.value;
  if (!accessToken) {
    redirect('/login');
  }
  return accessToken;
}

export async function getUser(): Promise<User> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('Access')?.value;
  if (!accessToken) {
    redirect('/login');
  }

  const res = await fetch(`${BACKEND_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Failed to fetch user');
    redirect('/login');
  }
  return data;
}

export async function getUserRole(): Promise<Role> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('Access')?.value;
  if (!accessToken) {
    redirect('/login');
  }

  const res = await fetch(`${BACKEND_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Failed to fetch user');
    redirect('/login');
  }
  return data.role;
}

export async function getCurrentUser(): Promise<User | null> {
  const headersList = await headers();
  const userDataHeader = headersList.get('x-user-data');

  if (userDataHeader) {
    try {
      return JSON.parse(userDataHeader) as User;
    } catch {
      return null;
    }
  }

  return null;
}
