import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch, url }) => {
  const token = cookies.get('Access');
  if (!token) throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);

  const res = await fetch(`${PUBLIC_API_URL}/admin/recent-activity`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.status === 401) throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);

  const recent = await res.json();
  return { recent, access: token };
};
