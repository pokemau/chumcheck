import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch, url }) => {
  const token = cookies.get('Access');
  if (!token) throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);

  const res = await fetch(`${PUBLIC_API_URL}/admin/startups-json`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.status === 401) throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  return { startups: await res.json() };
};

export const actions: Actions = {
  delete: async ({ cookies, request, fetch }) => {
    const token = cookies.get('Access');
    if (!token) return fail(401);
    const data = await request.formData();
    const id = data.get('id');
    const res = await fetch(`${PUBLIC_API_URL}/admin/startups/delete-json/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return fail(res.status);
    throw redirect(303, '/admin/startups');
  }
};
