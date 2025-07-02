import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BACKEND_API_URL } from './constants';
import { Role } from './enums';

export async function requireAccessTokenOrRedirect() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('Access')?.value;
  if (!accessToken) {
    redirect('/login');
  }
  return accessToken;
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
    console.error("Failed to fetch user");
    redirect('/login')
  }
  return data.role;
}
